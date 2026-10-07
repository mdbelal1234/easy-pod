import { Plus } from "lucide-react";
import { faqs } from "./faqs-data";
import { waLink } from "@/lib/site";

export function FAQSection() {
  return (
    <section id="faq" className="scroll-mt-16 border-t border-paper/10 bg-ink-2/40 py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20 lg:px-10">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="reveal font-display-wide text-4xl leading-[1.02] sm:text-5xl">
            Before you book.
          </h2>
          <p className="mt-5 text-muted-ink">
            Something not covered here?{" "}
            <a
              href={waLink("Hi! I have a question about recording at EasyPod Studio.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper underline decoration-tally underline-offset-4 hover:text-tally"
            >
              Chat on WhatsApp
            </a>
          </p>
        </div>

        <div className="border-b border-paper/10">
          {faqs.map((faq, i) => (
            <details
              key={faq.question}
              open={i === 0}
              className="group border-t border-paper/10"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium text-paper transition-colors hover:text-tally [&::-webkit-details-marker]:hidden">
                {faq.question}
                <Plus
                  aria-hidden
                  className="size-5 shrink-0 text-dim transition-transform duration-300 group-open:rotate-45 group-open:text-tally"
                />
              </summary>
              <p className="max-w-[62ch] pb-7 leading-relaxed text-muted-ink">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
