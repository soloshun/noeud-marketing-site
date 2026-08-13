import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Instrument_Serif, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

/**
 * Satoshi — geometric grotesque, the closest free match to the face in the
 * brand deck. Self-hosted; licensed under the Fontshare ITF Free Font License.
 */
const satoshi = localFont({
  variable: "--font-satoshi",
  display: "swap",
  src: [
    {
      path: "./fonts/Satoshi-Variable.woff2",
      weight: "300 900",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-VariableItalic.woff2",
      weight: "300 900",
      style: "italic",
    },
  ],
});

/** Reserved for pull-quotes and the one-line brand asides. */
const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

/** Every rate, basis point and cedi figure on the site. */
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const DESCRIPTION =
  "See what every foreign invoice is worth in cedis today, what your exposure could cost you, and which licensed bank offers the best rate — before settlement day, not after.";

export const metadata: Metadata = {
  metadataBase: new URL("https://noeud.africa"),
  title: {
    default: "NOEUD — The rate will move. Your margin doesn't have to.",
    template: "%s · NOEUD",
  },
  description: DESCRIPTION,
  applicationName: "NOEUD",
  keywords: [
    "FX risk control Africa",
    "currency risk Ghana",
    "USD GHS",
    "FX price discovery",
    "cedi reference rate",
    "IFRS 13 FX reporting",
    "importers exporters Africa",
  ],
  authors: [{ name: "NOEUD" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "NOEUD",
    title: "NOEUD — The rate will move. Your margin doesn't have to.",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "NOEUD — The rate will move. Your margin doesn't have to.",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#380b2a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${serif.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
