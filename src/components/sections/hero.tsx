import { ArrowRight, Play } from "lucide-react";
import { ButtonLink } from "@/components/site/button-link";
import { Photo } from "@/components/site/photo";
import { RecTimecode } from "@/components/site/rec-timecode";
import { photos } from "@/lib/media";
import { site } from "@/lib/site";

const corner = "absolute size-7 border-paper/45";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100dvh] items-end overflow-hidden">
      <Photo
        slot={photos.hero}
        sizes="100vw"
        preload
        placeholderClassName="items-start justify-end px-10 pt-36 lg:px-16 lg:pt-28"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />

      {/* Camera viewfinder framing the set */}
      <div aria-hidden className="pointer-events-none absolute inset-x-4 bottom-4 top-20 sm:inset-x-6 lg:inset-x-10 lg:bottom-8 lg:top-24">
        <span className={`${corner} left-0 top-0 border-l border-t`} />
        <span className={`${corner} right-0 top-0 border-r border-t`} />
        <span className={`${corner} bottom-0 left-0 border-b border-l`} />
        <span className={`${corner} bottom-0 right-0 border-b border-r`} />
        <div className="absolute left-5 top-4 lg:left-6 lg:top-5">
          <RecTimecode />
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] px-8 pb-16 sm:px-12 lg:px-20 lg:pb-24">
        <h1 className="font-display-wide text-[clamp(2.6rem,7.2vw,6.75rem)] leading-[0.95]">
          <span className="block overflow-hidden pb-[0.06em]">
            <span className="rise block" style={{ "--d": "80ms" } as React.CSSProperties}>
              Your podcast,
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span className="rise block" style={{ "--d": "180ms" } as React.CSSProperties}>
              filmed like a show.
            </span>
          </span>
        </h1>

        <p
          className="rise mt-6 max-w-md text-lg leading-relaxed text-paper/80"
          style={{ "--d": "320ms" } as React.CSSProperties}
        >
          A video podcast studio in Vatara, Dhaka. Up to three 4K cameras,
          studio audio, and a team that runs it.
        </p>

        <div
          className="rise mt-9 flex flex-col gap-3 sm:flex-row"
          style={{ "--d": "420ms" } as React.CSSProperties}
        >
          <ButtonLink href="#book">
            Book a session
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </ButtonLink>
          {site.studioTourVideoId ? (
            <ButtonLink href="#studio-tour" variant="line">
              <Play />
              Watch the tour
            </ButtonLink>
          ) : (
            <ButtonLink href="#studio" variant="line">
              See the studio
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}
