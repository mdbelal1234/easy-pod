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
  /** A stand-in stock image, not EasyPod's room. Monitors label it until replaced. */
  stock?: boolean;
};

export const photos = {
  hero: {
    // Stock: KVlcVi-Ulgo
    src: "/studio/hero.jpg",
    stock: true,
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
    stock: true,
    alt: "A mirrorless camera with a zoom lens on a grey surface",
    hint: "Main camera framed on the host chair",
  },
  lenses: {
    // Stock: MSFsffYYWHc
    src: "/studio/lenses.jpg",
    stock: true,
    alt: "Close-up of a camera lens showing its aperture markings",
    hint: "The lens line-up",
  },
  lighting: {
    // Stock: FavTI4FDN-0
    src: "/studio/lighting.jpg",
    stock: true,
    alt: "A Godox LED studio light showing its brightness and colour temperature",
    hint: "Key light or the coloured background",
  },
  audio: {
    // Stock: 3JZFQcOe78w
    src: "/studio/audio.jpg",
    stock: true,
    alt: "A podcast mixer, microphones on boom arms and headphones on a desk",
    hint: "Mic in use, or the mixer from above",
  },
  room: {
    // Stock: zVLCusXQSzs
    src: "/studio/room.jpg",
    stock: true,
    alt: "A microphone in front of acoustic foam panels",
    hint: "Acoustic panels, multi-cam monitor, the room itself",
  },
} satisfies Record<string, PhotoSlot>;

/**
 * The desk's three camera angles, cropped from `photos.hero`: `position` is
 * the focal point and `zoom` how far in that camera sits.
 * TEMPORARY: one stock photo cropped three ways. With real CAM 1/2/3 stills,
 * point each angle at its own photo and set zoom back to 1.
 */
export const angles = [
  { name: "Wide", position: "50% 50%", zoom: 1 },
  { name: "Medium", position: "53% 52%", zoom: 1.6 },
  { name: "Close", position: "80% 70%", zoom: 2.3 },
] as const;

export type Angle = (typeof angles)[number];
