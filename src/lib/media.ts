/**
 * Photo slots for the marketing site. Drop the real file into
 * `public/studio/` and set `src` (e.g. "/studio/hero.jpg"). Until `src` is
 * set, the slot renders a labelled placeholder describing the shot it needs.
 *
 * TEMPORARY: the photos below are free stock images (Unsplash License), not
 * EasyPod's own studio. Replace each file with a real studio photo before
 * launch and update its `alt`. Sources: https://unsplash.com/photos/<id>
 */
export type PhotoSlot = {
  src?: string;
  alt: string;
  /** What the photo should show. Only rendered while `src` is empty. */
  hint: string;
};

export const photos = {
  hero: {
    // Stock: KVlcVi-Ulgo
    src: "/studio/hero.jpg",
    alt: "A podcast table set with microphones on boom arms and headphones",
    hint: "Wide shot of the full set, lights on, people at the mics",
  },
  tourPoster: {
    alt: "EasyPod studio tour",
    hint: "Still from the tour video or a second wide angle",
  },
  cameras: {
    // Stock: cpqyTcC2xlw
    src: "/studio/cameras.jpg",
    alt: "A mirrorless camera with a zoom lens on a grey surface",
    hint: "Main camera framed on the host chair",
  },
  lenses: {
    // Stock: MSFsffYYWHc
    src: "/studio/lenses.jpg",
    alt: "Close-up of a camera lens showing its aperture markings",
    hint: "The lens line-up",
  },
  lighting: {
    // Stock: FavTI4FDN-0
    src: "/studio/lighting.jpg",
    alt: "A Godox LED studio light showing its brightness and colour temperature",
    hint: "Key light or the coloured background",
  },
  audio: {
    // Stock: 3JZFQcOe78w
    src: "/studio/audio.jpg",
    alt: "A podcast mixer, microphones on boom arms and headphones on a desk",
    hint: "Mic in use, or the mixer from above",
  },
  room: {
    // Stock: zVLCusXQSzs
    src: "/studio/room.jpg",
    alt: "A microphone in front of acoustic foam panels",
    hint: "Acoustic panels, multi-cam monitor, the room itself",
  },
} satisfies Record<string, PhotoSlot>;
