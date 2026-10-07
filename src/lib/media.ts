/**
 * Photo slots for the marketing site. Drop the real file into
 * `public/studio/` and set `src` (e.g. "/studio/hero.jpg"). Until `src` is
 * set, the slot renders a labelled placeholder describing the shot it needs.
 */
export type PhotoSlot = {
  src?: string;
  alt: string;
  /** What the photo should show. Only rendered while `src` is empty. */
  hint: string;
};

export const photos = {
  hero: {
    alt: "The EasyPod set in Vatara with cameras, mics and lights ready",
    hint: "Wide shot of the full set, lights on, people at the mics",
  },
  tourPoster: {
    alt: "EasyPod studio tour",
    hint: "Still from the tour video or a second wide angle",
  },
  cameras: {
    alt: "A camera framed on the host chair",
    hint: "Main camera framed on the host chair",
  },
  lenses: {
    alt: "Camera lenses lined up on the bench",
    hint: "The lens line-up",
  },
  lighting: {
    alt: "Key light and coloured background lights on set",
    hint: "Key light or the coloured background",
  },
  audio: {
    alt: "Microphones and the audio mixer on the desk",
    hint: "Mic in use, or the mixer from above",
  },
  room: {
    alt: "The acoustically treated recording room",
    hint: "Acoustic panels, multi-cam monitor, the room itself",
  },
} satisfies Record<string, PhotoSlot>;
