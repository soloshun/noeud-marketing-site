/**
 * Photography, hotlinked from the Unsplash CDN under the Unsplash licence.
 * Every entry carries its photographer so the credits block stays truthful —
 * if you swap an image, swap the credit with it.
 */
export type Photo = {
  id: string;
  by: string;
  alt: string;
};

const CDN = "https://images.unsplash.com/photo-";

export function photoUrl(photo: Photo, w: number, h: number) {
  return `${CDN}${photo.id}?auto=format&fit=crop&q=80&w=${w}&h=${h}`;
}

export const PHOTOS = {
  directors: {
    id: "1563132337-f159f484226c",
    by: "Etty Fidele",
    alt: "A finance director standing with arms folded, looking directly at the camera",
  },
  ops: {
    id: "1573497019418-b400bb3ab074",
    by: "Christina @ wocintechchat.com",
    alt: "A finance operations manager smiling in an office",
  },
  owners: {
    id: "1573166953836-06864dc70a21",
    by: "Christina @ wocintechchat.com",
    alt: "A business owner working at a laptop",
  },
  exportYard: {
    id: "1678182451047-196f22a4143e",
    by: "Ali Mkumbwa",
    alt: "Rows of shipping containers stacked in an African port terminal",
  },
  importBerth: {
    id: "1595587637401-83ff822bd63e",
    by: "Dominik Lückmann",
    alt: "Container ships loading at berth under gantry cranes",
  },
  accraMarket: {
    id: "1625191824068-e833954d6c70",
    by: "Kojo Kwarteng",
    alt: "Market canopies stretching across Accra, seen from above",
  },
} satisfies Record<string, Photo>;

export const PHOTO_CREDITS = Array.from(
  new Set(Object.values(PHOTOS).map((p) => p.by)),
);
