import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import ConsentManager from "@/components/shared/consent-manager";
import WhatsAppFab from "@/components/shared/whatsapp-fab";
import siteContent from "@/content/site.json";
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

export const viewport: Viewport = {
  themeColor: "#0a0d12",
};

export const metadata: Metadata = {
  title: {
    default: siteContent.homeMetadata.title,
    template: siteContent.homeMetadata.titleTemplate,
  },
  description: siteContent.homeMetadata.description,
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Event services",
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-GB": SITE_URL,
      "x-default": SITE_URL,
    },
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
    title: siteContent.homeMetadata.socialTitle,
    description: siteContent.homeMetadata.socialDescription,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: siteContent.socialLocale,
    type: "website",
    images: [
      {
        url: siteContent.homeMetadata.socialImage,
        width: 1536,
        height: 1024,
        alt: siteContent.homeMetadata.socialImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.homeMetadata.socialTitle,
    description: siteContent.homeMetadata.socialDescription,
    images: [siteContent.homeMetadata.socialImage],
  },
  icons: {
    icon: [
      { url: siteContent.icons.favicon },
      {
        url: siteContent.icons.shortcut,
        type: "image/png",
        sizes: "16x16",
      },
      {
        url: "/images/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: siteContent.icons.android192,
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: siteContent.icons.android512,
        type: "image/png",
        sizes: "512x512",
      },
    ],
    shortcut: siteContent.icons.shortcut,
    apple: [
      {
        url: siteContent.icons.apple,
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang={siteContent.language}
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
