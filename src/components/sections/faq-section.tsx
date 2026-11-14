import { Plus } from "lucide-react";
import { faqs } from "./faqs-data";
import { waLink } from "@/lib/site";

export function FAQSection() {
  return (
    <section id="faq" className="scroll-mt-16 bg-ink-2/40 py-24 lg:py-36">
      <div className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20 lg:px-10">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-display-wide text-[clamp(2.25rem,4.6vw,4.5rem)] leading-[1.02]">
            Before you book.
          </h2>
          <p className="mt-6 text-muted-ink">
            Something not covered here?{" "}
            <a
              href={waLink("Hi! I have a question about recording at EasyPod Studio.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper underline decoration-paper/40 underline-offset-4 hover:decoration-paper"
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
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display-wide text-lg leading-snug text-paper sm:text-xl [&::-webkit-details-marker]:hidden">
                {faq.question}
                <Plus
                  aria-hidden
                  className="size-5 shrink-0 text-dim transition-[transform,color] duration-300 group-hover:text-paper group-open:rotate-45 group-open:text-paper"
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
