import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: {
    default: siteContent.homeMetadata.title,
    template: siteContent.homeMetadata.titleTemplate,
  },
  description: siteContent.homeMetadata.description,
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
    title: siteContent.homeMetadata.socialTitle,
    description: siteContent.homeMetadata.socialDescription,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: siteContent.socialLocale,
    type: "website",
    images: [
      {
        url: siteContent.homeMetadata.socialImage,
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
    icon: siteContent.icons.favicon,
    shortcut: siteContent.icons.shortcut,
    apple: siteContent.icons.apple,
    other: {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      url: siteContent.icons.android192,
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
