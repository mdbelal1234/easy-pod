import { BookingForm } from "@/components/booking/booking-form";
import { waLink } from "@/lib/site";

const nextSteps = [
  {
    title: "Confirmation within 24 hours",
    description: "By email and WhatsApp, with your time and package.",
  },
  {
    title: "Flexible rescheduling",
    description: "Move your session up to 48 hours before it starts.",
  },
  {
    title: "A direct line to the team",
    description: "WhatsApp us before or after your session.",
  },
];

export function BookingSection() {
  return (
    <section id="book" className="scroll-mt-16 border-t border-paper/10 py-24 lg:py-32">
      {/* Mobile reads intro, form, then reassurance; desktop puts the form beside both. */}
      <div className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:grid-rows-[auto_1fr] lg:gap-x-20 lg:px-10">
        <div>
          <h2 className="reveal font-display-wide text-4xl leading-[1.02] sm:text-5xl lg:text-6xl">
            Book a session.
          </h2>
          <p className="mt-5 max-w-[44ch] text-pretty text-lg leading-relaxed text-muted-ink">
            Tell us when you&apos;d like to record. Not sure which package
            fits? Choose &ldquo;Not sure yet&rdquo; and we&apos;ll help.
          </p>
        </div>

        <div className="rounded-tight border border-paper/10 bg-ink-2 p-5 sm:p-10 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
          <BookingForm />
        </div>

        <div className="space-y-10">
          <div>
            <h3 className="text-lg font-medium">What happens next</h3>
            <ol className="mt-6 space-y-6">
              {nextSteps.map(({ title, description }) => (
                <li key={title} className="border-l border-tally/70 pl-4">
                  <p className="text-paper">{title}</p>
                  <p className="mt-1 text-sm text-muted-ink">{description}</p>
                </li>
              ))}
            </ol>
          </div>

          <p className="text-sm text-muted-ink">
            Rather talk it through?{" "}
            <a
              href={waLink("Hi! I'd like help booking a session at EasyPod Studio.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper underline decoration-tally underline-offset-4 hover:text-tally"
            >
              Chat on WhatsApp
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
