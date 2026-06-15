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
      className={`group relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black ${className}`}
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
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-purple-600 shadow-2xl shadow-purple-600/40 transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-1 h-7 w-7 fill-white text-white" />
          </span>
        </button>
      )}
    </div>
  );
}
