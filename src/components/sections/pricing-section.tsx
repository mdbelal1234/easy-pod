import { ArrowRight, Check } from "lucide-react";
import { AngleShot } from "@/components/site/angle-shot";
import { ButtonLink } from "@/components/site/button-link";
import { angles } from "@/lib/media";
import { cn } from "@/lib/utils";
import { formatTaka, packages } from "@/lib/packages";
import { waLink } from "@/lib/site";

const plans = packages;

type Cell = string | boolean;

const rows: { label: string; values: [Cell, Cell, Cell] }[] = [
  { label: "Coverage", values: ["Single angle", "Multi-angle", "Dynamic multi-angle"] },
  { label: "Audio", values: ["Up to 2 speakers", "Up to 2 speakers", "Up to 2 speakers"] },
  { label: "Lighting", values: ["Professional", "Creative setup", "Premium cinematic"] },
  { label: "On the floor", values: ["Technical help", "Technical help", "Dedicated assistant"] },
  { label: "Priority production support", values: [false, false, true] },
];

const included =
  "4K recording, studio audio, lighting, an air-conditioned room, setup before you arrive, and your raw footage on the spot.";

function CellValue({ value }: { value: Cell }) {
  if (value === true)
    return (
      <>
        <Check className="size-4 text-paper" strokeWidth={2.25} />
        <span className="sr-only">Included</span>
      </>
    );
  if (value === false)
    return (
      <>
        <span aria-hidden className="text-dim">-</span>
        <span className="sr-only">Not included</span>
      </>
    );
  return <>{value}</>;
}

/** The package's camera feeds: its angles on air, the rest as empty slots. */
function Feeds({ cameras }: { cameras: number }) {
  return (
    <span aria-hidden className="grid grid-cols-3 gap-1.5">
      {angles.map((angle, i) =>
        i < cameras ? (
          <span
            key={angle.name}
            className="relative block aspect-video overflow-hidden rounded-[3px] bg-glass ring-1 ring-paper/20"
          >
            <AngleShot angle={angle} sizes="(min-width: 1024px) 120px, 28vw" />
            <span className="ident absolute left-1 top-1 rounded-[2px] bg-glass/85 px-1 py-px text-[9px] text-paper">
              {i + 1}
            </span>
          </span>
        ) : (
          <span
            key={angle.name}
            className="block aspect-video rounded-[3px] border border-dashed border-paper/15"
          />
        )
      )}
    </span>
  );
}

export function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-16 py-24 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-3xl">
          <h2 className="font-display-wide text-[clamp(2.25rem,4.6vw,4.5rem)] leading-[1.02]">
            Pay for the cameras you need.
          </h2>
          <p className="mt-6 max-w-[56ch] text-pretty text-lg leading-relaxed text-muted-ink">
            Every session includes {included}
          </p>
        </div>

        {/* Desktop: one comparison table */}
        <table className="mt-16 hidden w-full table-fixed border-collapse text-left lg:table">
          <caption className="sr-only">Studio packages compared</caption>
          <colgroup>
            <col className="w-[22%]" />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr className="align-top">
              <td />
              {plans.map((plan) => (
                <th
                  key={plan.name}
                  scope="col"
                  className={cn(
                    "border-t-2 px-6 pb-8 pt-7 font-normal",
                    plan.featured ? "border-paper/60 bg-ink-2" : "border-transparent"
                  )}
                >
                  <Feeds cameras={plan.cameras} />
                  <span className="mt-7 flex items-center justify-between gap-4">
                    <span className="text-lg font-medium text-paper">{plan.name}</span>
                    {plan.featured && (
                      <span className="ident rounded-[2px] bg-paper/10 px-1.5 py-0.5 text-[10px] text-paper">Recommended</span>
                    )}
                  </span>
                  <span className="mt-2 block min-h-[2.75rem] text-sm text-muted-ink">
                    {plan.pitch}
                  </span>
                  <span className="mt-6 flex items-baseline gap-2">
                    <span className="font-display-wide text-5xl">{formatTaka(plan.price)}</span>
                    <span className="text-sm text-dim">an hour</span>
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" className="border-t border-paper/10 py-4 pr-6 text-sm font-normal text-muted-ink">
                4K cameras
              </th>
              {plans.map((plan) => (
                <td
                  key={plan.name}
                  className={cn(
                    "border-t border-paper/10 px-6 py-4 font-mono text-lg text-paper",
                    plan.featured && "bg-ink-2"
                  )}
                >
                  {plan.cameras}
                </td>
              ))}
            </tr>
            {rows.map((row) => (
              <tr key={row.label}>
                <th scope="row" className="border-t border-paper/10 py-4 pr-6 text-sm font-normal text-muted-ink">
                  {row.label}
                </th>
                {row.values.map((value, i) => (
                  <td
                    key={i}
                    className={cn(
                      "border-t border-paper/10 px-6 py-4 text-sm text-paper",
                      plans[i].featured && "bg-ink-2"
                    )}
                  >
                    <CellValue value={value} />
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td />
              {plans.map((plan) => (
                <td key={plan.name} className={cn("px-6 pb-7 pt-6", plan.featured && "bg-ink-2")}>
                  <ButtonLink
                    href={`/?package=${plan.slug}#book`}
                    variant={plan.featured ? "tally" : "line"}
                    className="w-full"
                  >
                    Book {plan.name}
                  </ButtonLink>
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        {/* Phone: swipeable row with the next plan peeking in. Tablet: three columns. */}
        <div className="relative -mx-4 mt-12 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0 lg:hidden">
          {plans.map((plan, p) => (
            <div
              key={plan.name}
              className={cn(
                "w-[84%] max-w-sm shrink-0 snap-start rounded-tight border p-5 md:w-auto md:max-w-none",
                plan.featured ? "border-paper/60 bg-ink-2" : "border-paper/10"
              )}
            >
              <Feeds cameras={plan.cameras} />
              <div className="mt-6 flex items-center justify-between gap-3">
                <h3 className="text-lg font-medium">{plan.name}</h3>
                {plan.featured && (
                  <span className="ident rounded-[2px] bg-paper/10 px-1.5 py-0.5 text-[10px] text-paper">Recommended</span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-ink">{plan.pitch}</p>
              <p className="mt-5 flex items-baseline gap-2">
                <span className="font-display-wide text-4xl">{formatTaka(plan.price)}</span>
                <span className="text-sm text-dim">an hour</span>
              </p>
              <dl className="mt-6 space-y-2.5 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-ink">4K cameras</dt>
                  <dd className="font-mono">{plan.cameras}</dd>
                </div>
                {rows.map((row) => (
                  <div key={row.label} className="flex justify-between gap-4">
                    <dt className="text-muted-ink">{row.label}</dt>
                    <dd className="text-right">
                      <CellValue value={row.values[p]} />
                    </dd>
                  </div>
                ))}
              </dl>
              <ButtonLink
                href={`/?package=${plan.slug}#book`}
                variant={plan.featured ? "tally" : "line"}
                className="mt-7 w-full"
              >
                Book {plan.name}
              </ButtonLink>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted-ink">
          Recording every week, or booking for a company?{" "}
          <a
            href={waLink("Hi! I'd like to ask about a custom or recurring plan at EasyPod Studio.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-paper underline decoration-paper/40 underline-offset-4 hover:decoration-paper"
          >
            Ask about a custom plan
            <ArrowRight className="size-3.5" />
          </a>
        </p>
      </div>
    </section>
  );
}
