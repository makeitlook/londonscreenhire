import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import Script from "next/script";
import ConsentManager from "@/components/shared/consent-manager";
import WebMcpProvider from "@/components/shared/webmcp-provider";
import WhatsAppFab from "@/components/shared/whatsapp-fab";
import siteContent from "@/content/site.json";
import { GA_TRACKING_ID } from "@/lib/gtag";
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
  keywords: siteContent.homeMetadata.keywords,
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
        width: siteContent.homeMetadata.socialImageWidth,
        height: siteContent.homeMetadata.socialImageHeight,
        alt: siteContent.homeMetadata.socialImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.homeMetadata.socialTitle,
    description: siteContent.homeMetadata.twitterDescription,
    images: [siteContent.homeMetadata.twitterImage],
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
  verification: {
    google: "5weQ7lTIbyaVvLCBI5zdDM-g6pYuXcO7RYDncm695Ts",
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
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5V42SDFR');`}
        </Script>
      </head>
      <body className="font-body">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5V42SDFR"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-tag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `}
        </Script>
        {children}
        <WhatsAppFab />
        <WebMcpProvider />
        <ConsentManager />
      </body>
    </html>
  );
}
