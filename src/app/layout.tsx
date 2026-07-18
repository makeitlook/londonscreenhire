import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import ConsentManager from "@/components/shared/consent-manager";
import WhatsAppFab from "@/components/shared/whatsapp-fab";
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
    default: "London Screen Hire",
    template: "%s | London Screen Hire",
  },
  description:
    "Professional LED and projection screen hire in London. Quote requests welcome.",
  keywords: ["screen hire", "LED screen", "London", "AV hire", "event screens"],
  metadataBase: new URL("https://londonscreenhire.com"),
  openGraph: {
    title: "London Screen Hire",
    description:
      "Professional LED and projection screen hire in London. Quote requests welcome.",
    url: "https://londonscreenhire.com",
    siteName: "London Screen Hire",
    locale: "en_GB",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
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
