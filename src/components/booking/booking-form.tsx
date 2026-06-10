"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { bookingSchema, type BookingFormData } from "@/lib/validations";
import { createBooking } from "@/lib/actions/booking";

const recordingTypes = [
  { value: "PODCAST", label: "Podcast Recording" },
  { value: "VIDEO_PODCAST", label: "Video Podcast" },
  { value: "INTERVIEW", label: "Interview" },
  { value: "LIVESTREAM", label: "Live Streaming" },
  { value: "SHORTS_REELS", label: "Shorts & Reels" },
  { value: "CORPORATE", label: "Corporate Content" },
  { value: "OTHER", label: "Other" },
];

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM",
  "3:00 PM", "4:00 PM", "5:00 PM",
  "6:00 PM",
];

interface BookingFormProps {
  packages?: { id: string; name: string; price: number }[];
}

export function BookingForm({ packages = [] }: BookingFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormData) => {
    const result = await createBooking(data);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Received!</h3>
        <p className="text-gray-500">
          We&apos;ll confirm your session within 24 hours via email and WhatsApp.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Your name"
            className="mt-1"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="you@example.com"
            className="mt-1"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            {...register("phone")}
            placeholder="+880 1XXX-XXXXXX"
            className="mt-1"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="company">Company / Brand</Label>
          <Input
            id="company"
            {...register("company")}
            placeholder="Optional"
            className="mt-1"
          />
        </div>
      </div>

      {packages.length > 0 && (
        <div>
          <Label htmlFor="packageId">Package</Label>
          <select
            id="packageId"
            {...register("packageId")}
            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Select a package (optional)</option>
            {packages.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.name} — ৳{pkg.price.toLocaleString()}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <Label htmlFor="recordingType">Recording Type *</Label>
        <select
          id="recordingType"
          {...register("recordingType")}
          className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">Select type</option>
          {recordingTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.recordingType && (
          <p className="text-red-500 text-xs mt-1">
            {errors.recordingType.message}
          </p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="preferredDate">Preferred Date *</Label>
          <Input
            id="preferredDate"
            type="date"
            {...register("preferredDate")}
            min={new Date().toISOString().split("T")[0]}
            className="mt-1"
          />
          {errors.preferredDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.preferredDate.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="preferredTime">Preferred Time *</Label>
          <select
            id="preferredTime"
            {...register("preferredTime")}
            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Select time</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.preferredTime && (
            <p className="text-red-500 text-xs mt-1">
              {errors.preferredTime.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          {...register("notes")}
          placeholder="Tell us about your podcast, number of guests, special requirements..."
          rows={4}
          className="mt-1"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white border-0 text-base font-semibold"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Confirm Booking"
        )}
      </Button>

      <p className="text-center text-gray-400 text-xs">
        We&apos;ll confirm within 24 hours via email & WhatsApp
      </p>
    </form>
  );
}
