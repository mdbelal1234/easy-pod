import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/site/button-link";
import { site, waLink } from "@/lib/site";

const details = [
  { term: "Address", lines: ["Salam Tower, Vatara", "Near Evercare Hospital, Dhaka"] },
  { term: "Hours", lines: ["Daily, 9 AM to 10 PM", "Other times by appointment"] },
  { term: "Parking", lines: ["Free visitor parking on site", "Valet on request"] },
];

export function LocationSection() {
  return (
    <section id="contact" className="relative scroll-mt-16 border-t border-paper/10 lg:min-h-[640px]">
      <iframe
        src={site.mapEmbedSrc}
        title={`${site.name} location in Dhaka`}
        className="h-[360px] w-full lg:absolute lg:inset-0 lg:h-full"
        style={{ border: 0, filter: "grayscale(1) invert(0.92) contrast(0.9) brightness(0.85)" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />

      <div className="pointer-events-none relative mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:flex lg:min-h-[640px] lg:items-center lg:justify-end lg:px-10 lg:py-16">
        <div className="pointer-events-auto w-full rounded-tight bg-ink/95 lg:max-w-md lg:border lg:border-paper/10 lg:p-10 lg:shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8)] lg:backdrop-blur">
          <h2 className="font-display-wide text-4xl leading-[1.02]">Find us in Vatara.</h2>

          <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {details.map(({ term, lines }) => (
              <div key={term}>
                <dt className="text-sm text-dim">{term}</dt>
                {lines.map((line) => (
                  <dd key={line} className="text-paper">
                    {line}
                  </dd>
                ))}
              </div>
            ))}
            <div>
              <dt className="text-sm text-dim">Contact</dt>
              <dd>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-paper hover:text-tally">
                  {site.phone}
                </a>
              </dd>
              <dd>
                <a href={`mailto:${site.email}`} className="text-paper hover:text-tally">
                  {site.email}
                </a>
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={waLink("Hi! I'd like to visit the EasyPod studio in Dhaka.")}
              variant="line"
              className="flex-1"
            >
              Chat on WhatsApp
            </ButtonLink>
            <ButtonLink href={site.mapsLink} variant="line" className="flex-1">
              Directions
              <ArrowUpRight />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
