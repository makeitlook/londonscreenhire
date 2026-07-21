import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import ConsentManager from "@/components/shared/consent-manager";
import WhatsAppFab from "@/components/shared/whatsapp-fab";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const OG_DESCRIPTION =
  "Professional LED screen and projection screen hire for events across London and the UK. Request a free quote today.";

export const metadata: Metadata = {
  title: {
    default: "LED Screen Hire London | London Screen Hire",
    template: "%s | London Screen Hire",
  },
  description:
    "Professional LED screen hire and AV production for corporate events, conferences, exhibitions, weddings and live events across London and the UK. Request a free quote today.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "London Screen Hire | LED & Projection Screen Hire",
    description: OG_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/images/hero/hero.png",
        alt: "London Screen Hire, professional LED and projection screen hire for events",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "London Screen Hire | LED & Projection Screen Hire",
    description: OG_DESCRIPTION,
    images: ["/images/hero/hero.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/images/favicon-16x16.png",
    apple: "/images/apple-touch-icon.png",
    other: {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      url: "/images/android-chrome-192x192.png",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-GB"
      className={`${barlowCondensed.variable} ${inter.variable}`}
    >
      <body className="font-body">
        {children}
        <WhatsAppFab />
        <ConsentManager />
      </body>
    </html>
  );
}
