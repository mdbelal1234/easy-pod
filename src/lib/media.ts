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
    alt: "Sony Alpha 7 IV on its rig, framed on the host chair",
    hint: "Sony A7 IV on its rig",
  },
  lenses: {
    alt: "Sony and Tamron lenses lined up on the bench",
    hint: "The lens line-up",
  },
  lighting: {
    alt: "Godox key light and RGB background lights",
    hint: "Godox key light or the RGB background",
  },
  audio: {
    alt: "RodeCaster Duo and Rode PodMic on the desk",
    hint: "RodeCaster Duo top-down, PodMic in use",
  },
  room: {
    alt: "The acoustically treated recording room",
    hint: "Acoustic panels, multi-cam monitor, the room itself",
  },
} satisfies Record<string, PhotoSlot>;
