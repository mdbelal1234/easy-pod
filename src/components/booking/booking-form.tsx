"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ButtonLink } from "@/components/site/button-link";
import { bookingSchema, type BookingFormData } from "@/lib/validations";
import { createBooking } from "@/lib/actions/booking";
import { formatTaka, packages, type PackageSlug } from "@/lib/packages";
import { waLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const recordingTypes = [
  { value: "PODCAST", label: "Audio podcast" },
  { value: "VIDEO_PODCAST", label: "Video podcast" },
  { value: "INTERVIEW", label: "Interview" },
  { value: "LIVESTREAM", label: "Live stream" },
  { value: "SHORTS_REELS", label: "Shorts and reels" },
  { value: "CORPORATE", label: "Corporate content" },
  { value: "OTHER", label: "Something else" },
] as const;

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM",
  "3:00 PM", "4:00 PM", "5:00 PM",
  "6:00 PM",
];

/** Shared look for every selectable option: a radio hidden inside a 4px box. */
const option =
  "relative flex cursor-pointer select-none rounded-tight border border-input text-sm text-paper/85 transition-colors hover:border-paper/45 hover:text-paper has-checked:border-tally has-checked:bg-tally/10 has-checked:text-paper has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-tally";

const labelText = "text-sm font-medium text-paper";

/** Pre-selects the package passed as `?package=<slug>` (from the pricing buttons). */
function PackageFromUrl({ onPackage }: { onPackage: (slug: PackageSlug) => void }) {
  const slug = useSearchParams().get("package");
  useEffect(() => {
    const match = packages.find((p) => p.slug === slug);
    if (match) onPackage(match.slug);
  }, [slug, onPackage]);
  return null;
}

function ErrorText({ id, error }: { id: string; error?: FieldError }) {
  if (!error?.message) return null;
  return (
    <p id={id} className="mt-2 text-sm text-tally-hover">
      {error.message}
    </p>
  );
}

function Optional() {
  return <span className="font-normal text-dim"> (optional)</span>;
}

function Confirmation({ date, time }: { date: string; time: string }) {
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    heading.current?.focus();
  }, []);

  const day = new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="rise py-6 sm:py-10">
      <span className="flex size-12 items-center justify-center rounded-tight bg-tally text-ink">
        <Check className="size-6" strokeWidth={2.5} />
      </span>
      <h3
        ref={heading}
        tabIndex={-1}
        className="mt-8 font-display-wide text-3xl leading-tight outline-none sm:text-4xl"
      >
        Request received.
      </h3>
      <p className="mt-4 max-w-[46ch] text-pretty text-lg leading-relaxed text-muted-ink">
        We&apos;ve got your request for {day} at {time}. Expect a
        confirmation by email and WhatsApp within 24 hours.
      </p>
      <ButtonLink
        href={waLink(`Hi! I just requested a session at EasyPod Studio for ${day} at ${time}.`)}
        variant="line"
        className="mt-8"
      >
        Chat on WhatsApp
        <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
      </ButtonLink>
    </div>
  );
}

export function BookingForm() {
  const [booked, setBooked] = useState<{ date: string; time: string } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { package: "" },
  });

  const selectPackage = useCallback(
    (slug: PackageSlug) => setValue("package", slug),
    [setValue]
  );

  const onSubmit = async (data: BookingFormData) => {
    const result = await createBooking(data);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    setBooked({ date: data.preferredDate, time: data.preferredTime });
  };

  if (booked) return <Confirmation {...booked} />;

  /** aria wiring for a field and its error message. */
  const a11y = (name: keyof BookingFormData) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-9">
      <Suspense fallback={null}>
        <PackageFromUrl onPackage={selectPackage} />
      </Suspense>

      <fieldset>
        <legend className={labelText}>Package</legend>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {packages.map((pkg) => (
            <label key={pkg.slug} className={cn(option, "flex-col gap-1 p-3.5")}>
              <input type="radio" value={pkg.slug} {...register("package")} className="sr-only" />
              <span className="font-medium leading-snug">{pkg.name}</span>
              <span className="text-xs text-muted-ink tabular-nums">
                {formatTaka(pkg.price)} / hour
              </span>
            </label>
          ))}
          <label className={cn(option, "flex-col gap-1 p-3.5")}>
            <input type="radio" value="" {...register("package")} className="sr-only" />
            <span className="font-medium leading-snug">Not sure yet</span>
            <span className="text-xs text-muted-ink">We&apos;ll help you pick</span>
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend className={labelText}>What are you recording?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {recordingTypes.map((type) => (
            <label key={type.value} className={cn(option, "px-3.5 py-2")}>
              <input
                type="radio"
                value={type.value}
                {...register("recordingType")}
                {...a11y("recordingType")}
                className="sr-only"
              />
              {type.label}
            </label>
          ))}
        </div>
        <ErrorText id="recordingType-error" error={errors.recordingType} />
      </fieldset>

      <div>
        <label htmlFor="preferredDate" className={labelText}>
          Date
        </label>
        <Input
          id="preferredDate"
          type="date"
          {...register("preferredDate")}
          {...a11y("preferredDate")}
          min={new Date().toISOString().split("T")[0]}
          className="mt-3 sm:max-w-[16rem]"
        />
        <ErrorText id="preferredDate-error" error={errors.preferredDate} />
      </div>

      <fieldset>
        <legend className={labelText}>Start time</legend>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {timeSlots.map((slot) => (
            <label key={slot} className={cn(option, "justify-center py-2.5 tabular-nums")}>
              <input
                type="radio"
                value={slot}
                {...register("preferredTime")}
                {...a11y("preferredTime")}
                className="sr-only"
              />
              {slot}
            </label>
          ))}
        </div>
        <ErrorText id="preferredTime-error" error={errors.preferredTime} />
      </fieldset>

      <div className="grid gap-x-4 gap-y-6 border-t border-paper/10 pt-9 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelText}>
            Name
          </label>
          <Input id="name" autoComplete="name" {...register("name")} {...a11y("name")} className="mt-2" />
          <ErrorText id="name-error" error={errors.name} />
        </div>
        <div>
          <label htmlFor="phone" className={labelText}>
            Phone or WhatsApp
          </label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+880 1XXX-XXXXXX"
            {...register("phone")}
            {...a11y("phone")}
            className="mt-2"
          />
          <ErrorText id="phone-error" error={errors.phone} />
        </div>
        <div>
          <label htmlFor="email" className={labelText}>
            Email
          </label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
            {...a11y("email")}
            className="mt-2"
          />
          <ErrorText id="email-error" error={errors.email} />
        </div>
        <div>
          <label htmlFor="company" className={labelText}>
            Company or show name
            <Optional />
          </label>
          <Input id="company" autoComplete="organization" {...register("company")} className="mt-2" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="notes" className={labelText}>
            Anything we should know?
            <Optional />
          </label>
          <Textarea
            id="notes"
            {...register("notes")}
            placeholder="Number of guests, the format of the show, a backdrop colour you'd like"
            rows={3}
            className="mt-2"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex h-12 w-full items-center justify-center gap-2.5 rounded-tight bg-tally text-[15px] font-medium text-ink transition-[background-color,transform] duration-200 hover:bg-tally-hover active:translate-y-px disabled:cursor-wait disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending request
          </>
        ) : (
          "Request booking"
        )}
      </button>
    </form>
  );
}
