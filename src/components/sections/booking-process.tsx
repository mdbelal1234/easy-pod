const steps = [
  {
    title: "Book",
    description: "Pick a package and a time. We confirm within 24 hours.",
  },
  {
    title: "Arrive",
    description: "Cameras, mics and lights are set up before you walk in.",
  },
  {
    title: "Record",
    description: "Just talk. First time on a mic? We guide you through it.",
  },
  {
    title: "Take it home",
    description: "Raw footage is yours on the spot. Editing and clips are available as add-ons.",
  },
];

export function BookingProcess() {
  return (
    <section id="process" className="scroll-mt-16 border-t border-paper/10 bg-ink-2/40 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <h2 className="reveal max-w-2xl font-display-wide text-4xl leading-[1.02] sm:text-5xl lg:text-6xl">
          How a session works.
        </h2>

        <div className="relative mt-16">
          {/* Timeline: fills as the section scrolls into view */}
          <div aria-hidden className="absolute inset-x-0 top-0 hidden h-px bg-paper/15 md:block">
            <div className="scroll-fill h-full bg-tally" />
          </div>

          <ol className="grid gap-10 md:grid-cols-4 md:gap-8">
            {steps.map((step) => (
              <li
                key={step.title}
                className="relative border-l border-paper/15 pl-5 md:border-l-0 md:pl-0 md:pt-10"
              >
                <span
                  aria-hidden
                  className="absolute -left-[3px] top-1.5 size-[5px] bg-tally md:-top-[2px] md:left-0"
                />
                <h3 className="font-display-wide text-2xl">{step.title}</h3>
                <p className="mt-3 max-w-[30ch] leading-relaxed text-muted-ink">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
