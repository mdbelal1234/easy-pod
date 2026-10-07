"use client";

import { useState } from "react";
import { Play } from "lucide-react";

interface YouTubeEmbedProps {
  /** YouTube video ID, e.g. "dQw4w9WgXcQ" */
  videoId: string;
  title: string;
  /** Optional override for the poster image */
  poster?: string;
  className?: string;
}

/**
 * Lite YouTube facade: renders the thumbnail + play button and only mounts the
 * heavy iframe after the user clicks. Keeps the homepage fast (no third-party
 * JS until intent) which protects LCP/INP.
 */
export function YouTubeEmbed({
  videoId,
  title,
  poster,
  className = "",
}: YouTubeEmbedProps) {
  const [active, setActive] = useState(false);
  const thumb =
    poster ?? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div
      className={`group relative aspect-video w-full overflow-hidden rounded-tight bg-ink-2 ${className}`}
    >
      {active ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Play video: ${title}`}
          className="absolute inset-0 h-full w-full cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/20" />
          <span className="absolute bottom-5 left-5 flex items-center gap-4 sm:bottom-8 sm:left-8">
            <span className="flex size-14 items-center justify-center rounded-tight bg-tally text-ink transition-transform duration-300 group-hover:scale-105 group-active:scale-95 sm:size-16">
              <Play className="ml-0.5 size-6 fill-current" />
            </span>
            <span className="text-left text-sm font-medium text-paper sm:text-base">
              Play the studio tour
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
