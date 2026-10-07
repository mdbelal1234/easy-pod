import { ArrowRight, Check } from "lucide-react";
import { ButtonLink } from "@/components/site/button-link";
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
  { label: "Raw footage handover", values: [true, true, true] },
];

const included =
  "4K recording, studio audio, lighting, an air-conditioned room, setup before you arrive, and your raw footage on the spot.";

function CellValue({ value }: { value: Cell }) {
  if (value === true)
    return (
      <>
        <Check className="size-4 text-tally" strokeWidth={2.25} />
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

export function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-16 border-t border-paper/10 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="reveal max-w-2xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-tally">
            Hourly rates
          </p>
          <h2 className="font-display-wide text-4xl leading-[1.02] sm:text-5xl lg:text-6xl">
            Pay for the cameras you need.
          </h2>
          <p className="mt-5 max-w-[56ch] text-pretty text-lg leading-relaxed text-muted-ink">
            Every session includes {included}
          </p>
        </div>

        {/* Desktop: one comparison table */}
        <table className="reveal mt-16 hidden w-full table-fixed border-collapse text-left lg:table">
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
                    "border-t-2 border-transparent px-6 pb-8 pt-7 font-normal",
                    plan.featured && "border-tally bg-ink-2"
                  )}
                >
                  <span className="flex items-center justify-between">
                    <span className="text-lg font-medium text-paper">{plan.name}</span>
                    {plan.featured && (
                      <span className="font-mono text-xs text-tally">Recommended</span>
                    )}
                  </span>
                  <span className="mt-2 block min-h-[2.75rem] text-sm text-muted-ink">
                    {plan.pitch}
                  </span>
                  <span className="mt-6 flex items-baseline gap-2">
                    <span className="font-display-wide text-5xl">{formatTaka(plan.price)}</span>
                    <span className="text-sm text-dim">per hour</span>
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
                    "border-t border-paper/10 px-6 py-4",
                    plan.featured && "bg-ink-2"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-2xl text-paper">{plan.cameras}</span>
                    <span aria-hidden className="flex gap-1">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <span
                          key={i}
                          className={cn(
                            "h-3 w-5 rounded-[2px]",
                            i < plan.cameras ? "bg-tally" : "border border-paper/20"
                          )}
                        />
                      ))}
                    </span>
                  </span>
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
                    Book a session
                  </ButtonLink>
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        {/* Mobile and tablet: one block per plan */}
        <div className="mt-12 grid gap-4 md:grid-cols-3 lg:hidden">
          {plans.map((plan, p) => (
            <div
              key={plan.name}
              className={cn(
                "rounded-tight border p-6",
                plan.featured ? "border-tally bg-ink-2" : "border-paper/10"
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{plan.name}</h3>
                {plan.featured && (
                  <span className="font-mono text-xs text-tally">Recommended</span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-ink">{plan.pitch}</p>
              <p className="mt-5 flex items-baseline gap-2">
                <span className="font-display-wide text-4xl">{formatTaka(plan.price)}</span>
                <span className="text-sm text-dim">per hour</span>
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
                Book a session
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
            className="inline-flex items-center gap-1 text-paper underline decoration-tally underline-offset-4 hover:text-tally"
          >
            Ask about a custom plan
            <ArrowRight className="size-3.5" />
          </a>
        </p>
      </div>
    </section>
  );
}
