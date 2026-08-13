/**
 * Placeholder editorial. The positioning line is "we publish research, not
 * marketing", so these are written as method notes rather than announcements —
 * but the bodies are sample copy for NOEUD's team to replace.
 */
export type Post = {
  slug: string;
  title: string;
  dek: string;
  tag: string;
  date: string;
  readingTime: string;
  body: string[];
};

export const POSTS: Post[] = [
  {
    slug: "what-a-commercial-midrate-is",
    title: "What a commercial midrate is, and why your bank quotes something else",
    dek: "The difference between the rate that clears the interbank market and the rate on your ticket is not a mystery. It is a spread, and it has a size.",
    tag: "Method",
    date: "2026-07-28",
    readingTime: "6 min",
    body: [
      "Every conversion has two numbers attached to it. The first is the rate at which the market is actually clearing at that moment — the commercial midrate. The second is the rate your counterparty offers you, which includes their cost of funding, their view of your alternatives, and their margin.",
      "Neither number is secret. The first is observable if you collect enough quotes; the second arrives on your ticket. What has historically been missing in this region is anyone writing both of them down, next to each other, at the moment of the trade.",
      "That is the whole of what Mark does. It is not a forecast and it makes no claim about where the rate is going. It records what the market was doing when you committed, so that the spread you paid becomes a number you can look at rather than a feeling you have.",
    ],
  },
  {
    slug: "why-quarter-end-is-too-late",
    title: "Why quarter-end is the wrong time to learn your FX cost",
    dek: "By the time an FX loss reaches the management accounts, every decision that produced it has already been taken.",
    tag: "Practice",
    date: "2026-07-14",
    readingTime: "5 min",
    body: [
      "FX cost in a trading business is not a single event. It accumulates across every open invoice, every day, in small amounts that are individually unremarkable and collectively material.",
      "Reconciliation is designed to catch what happened. It is not designed to catch what is still happening. An exposure that has been open for three weeks and has four weeks left to run is not a historical fact — it is a live position, and it can still be acted on.",
      "The practical change is small: value the book daily rather than at period end. The reporting change is larger, because a number that updates daily is a number someone can be asked about.",
    ],
  },
  {
    slug: "what-competition-does-to-a-quote",
    title: "What competition does to a quote",
    dek: "A request sent to one dealer and the same request sent to five are not the same request, even before anyone answers.",
    tag: "Method",
    date: "2026-06-30",
    readingTime: "7 min",
    body: [
      "Dealers price risk, but they also price information. A counterparty who knows they are the only call you are making is pricing a different trade to one who knows four others are quoting the same ticket.",
      "This is not an accusation of bad faith. It is how any market with asymmetric information works, and it applies equally to the banks we route to.",
      "What changes the outcome is not pressure but structure: the same request, at the same moment, to several licensed counterparties, with the winning bid recorded. The record matters as much as the bid — it is what lets you ask, next quarter, whether the pattern held.",
    ],
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
