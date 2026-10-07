import { YouTubeEmbed } from "./youtube-embed";
import { site } from "@/lib/site";

const highlights = [
  { title: "Multi-camera", detail: "Up to three synced 4K angles" },
  { title: "Lighting", detail: "Key, fill and coloured background" },
  { title: "Microphones", detail: "A mic for every speaker" },
  { title: "The room", detail: "Acoustically treated, air-conditioned" },
];

export function StudioTour() {
  if (!site.studioTourVideoId) return null;

  return (
    <section id="studio-tour" className="scroll-mt-16 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="reveal max-w-2xl">
          <h2 className="font-display-wide text-4xl leading-[1.02] sm:text-5xl lg:text-6xl">
            See the room before you book it.
          </h2>
          <p className="mt-5 max-w-[52ch] text-pretty text-lg leading-relaxed text-muted-ink">
            A short walk through the cameras, lights, mics and the space you&apos;ll
            record in.
          </p>
        </div>

        <div className="reveal mt-12 lg:mt-16">
          <YouTubeEmbed
            videoId={site.studioTourVideoId}
            title="EasyPod Studio tour, Dhaka video podcast studio"
          />
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {highlights.map(({ title, detail }) => (
            <div key={title} className="border-l border-tally/70 pl-4">
              <dt className="text-sm font-medium text-paper">{title}</dt>
              <dd className="mt-1 text-sm text-muted-ink">{detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
