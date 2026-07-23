import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_URL, CONTACT_INFO } from "@/constants";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  title: "Tiffin Hub — Fresh Homemade Meals Delivered Daily",
  description:
    "Affordable, hygienic, and delicious homemade tiffin service in " +
    CONTACT_INFO.serviceArea +
    ". Order veg thali, non-veg thali, Bengali specials & more."+SITE_URL,
  keywords: [
    "tiffin service",
    "food delivery",
    "homemade meals",
    "Bhatpara",
    "Naihati",
    "Bengali food",
    "daily tiffin",
    "healthy meals",
    "affordable tiffin",
    "meal delivery",
    "tiffin hub",
    "Kolkata food",
    "Indian cuisine",
    "fresh meals",
    "home-cooked food",
    "tiffin subscription",
    "meal plans",
    "tiffin service near me",
    "tiffin delivery",
    "homemade food",
    "Tiffin Hub",
    "Kolkata tiffin service",
    "Bengali thali",
    "non-veg thali",
    "veg thali",
    "Bengali cuisine",
    "Indian food delivery",
    "tiffin service Kolkata",
    "tiffin service Bhatpara",
    "tiffin service Naihati",
    "homemade tiffin",
    "fresh tiffin",
    "daily meal delivery",
    "affordable homemade meals",
    "healthy homemade meals",
    "tiffin service for office",
    "tiffin service for students",
    "tiffin service for families",
    "homemade Bengali food",
    "homemade Indian food",
    "tiffin service with variety",
    "tiffin service with subscription",
    "tiffin service with meal plans",
    "tiffin service with delivery",
    "tiffin service with fresh meals",
    "tiffin service with healthy meals",
    "tiffin service with affordable meals",
    "digitalindian",
    "digitalindian.co.in",
    "tiffinhub.com",
    "tiffinhub.in",
    "tiffinhub.co.in",
    "tiffinhub.net",
    "tiffinhub.org",
    "tiffinhub.info",
    "tiffinhub.shop",

  ],
 
  authors: [{ name: "Digital Indian", url: "https://digitalindian.co.in" }],

  creator: "Digital Indian",
  publisher: "Digital Indian",
  metadataBase: new URL(SITE_URL) ,
  abstract: "Tiffin Hub is a tiffin service that delivers fresh, hygienic, and affordable homemade meals daily across Bhatpara and nearby areas. We offer a variety of meal options including veg thali, non-veg thali, Bengali specials, and more. Our mission is to provide healthy and delicious home-cooked food to our customers at an affordable price.",
  // <meta name="google-site-verification" content="u0EKq_k_B3sLqsJwe7FXapVXCr6YFz7G9Yy1hn2oWcc" />
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": `${SITE_URL}/feed.xml`,
    },
  },
  verification: {
    google: "u0EKq_k_B3sLqsJwe7FXapVXCr6YFz7G9Yy1hn2oWcc",
  },
  appleWebApp: {
    capable: true,
    title: "Tiffin Hub",
    statusBarStyle: "default",
  },
  manifest: `${SITE_URL}/manifest.json`,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  applicationName: "Tiffin Hub",
  appLinks: {
    web: {
      url: SITE_URL,
    },
  },
  generator: "Next.js",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  itunes: {
    appId: "1234567890",
  },
  other: {
    "msapplication-TileColor": "#da532c",
    "msapplication-TileImage": "/mstile-144x144.png",
    "msapplication-config": "/browserconfig.xml",
  },
  referrer: "no-referrer",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/icon.png",
    },
  },
  openGraph: {
    title: "Tiffin Hub — Fresh Homemade Meals Delivered Daily",
    description:
      "Healthy, affordable tiffin service in Bhatpara & surrounding areas. From ₹69.",
    url: SITE_URL,
    siteName: "Tiffin Hub",
    locale: "en_IN",
    type: "website",
    ttl: 3600,
  },
  twitter: {
    card: "summary_large_image",
    title: "Tiffin Hub",
    description: "Homemade meals delivered daily. Order now!",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}