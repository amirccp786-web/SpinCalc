import type { Metadata } from "next";
import Link from "next/link";
import { Menu, User, Calculator } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://spincalc.vercel.app"),
  title: {
    template: "%s | Spinning Calculator",
    default: "Spinning Calculator - Textile Mill Production, Draft & Twist Calculations",
  },
  description:
    "Free textile spinning production calculators for Blow Room, Carding, Drawing, Comber, Simplex, Ring Frame, and Auto Cone winding efficiency, draft, noil, and twist calculations.",
  keywords: [
    "spinning calculator",
    "textile calculator",
    "textile spinning production calculator",
    "blow room calculator",
    "carding production calculator",
    "draw frame calculator",
    "comber noil calculator",
    "simplex roving calculator",
    "ring frame production calculator",
    "twist multiplier calculator",
    "TPI calculator",
    "auto cone winding calculator",
    "yarn count Ne",
    "textile engineering calculations",
    "spinning mill software",
    "Pakistan spinning mills",
    "Faisalabad textile",
    "India spinning mills",
    "Coimbatore textile",
    "Bangladesh spinning mills"
  ],
  authors: [{ name: "Textile Engineering Specialist Team" }],
  creator: "Fiber Technology",
  publisher: "Spinning Calculator",
  alternates: {
    canonical: "https://spincalc.vercel.app/",
  },
  openGraph: {
    title: "Spinning Calculator - Textile Mill Production, Draft & Twist Calculations",
    description:
      "Free textile spinning production calculators for Blow Room, Carding, Drawing, Comber, Simplex, Ring Frame, and Auto Cone winding efficiency, draft, noil, and twist calculations.",
    url: "https://spincalc.vercel.app/",
    siteName: "Spinning Calculator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spinning Calculator - Textile Mill Production, Draft & Twist Calculations",
    description:
      "Free textile spinning production calculators for Blow Room, Carding, Drawing, Comber, Simplex, Ring Frame, and Auto Cone winding efficiency, draft, noil, and twist calculations.",
  },
  other: {
    "geo.region": "PK-PB;PK-SD;IN-TN;IN-GJ;BD-C",
    "geo.placename": "Faisalabad, Lahore, Karachi, Coimbatore, Tirupur, Ahmedabad, Dhaka, Gazipur",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Spinning Calculator",
  url: "https://spincalc.vercel.app/",
  applicationCategory: "BusinessApplication",
  operatingSystem: "All",
  browserRequirements: "Requires JavaScript. Requires HTML5.",
  audience: {
    "@type": "Audience",
    audienceType: "Textile Engineers, Spinning Mill Managers, Production Supervisors"
  },
  description:
    "Free textile spinning production calculators for Blow Room, Carding, Drawing, Comber, Simplex, Ring Frame, and Auto Cone winding efficiency, draft, noil, and twist calculations.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "Blow Room Production & Lap Weight Calculation",
    "Carding Machine Production & Total Draft Calculation",
    "Draw Frame Delivery Speed & Actual Draft Calculation",
    "Comber Production & Noil Percentage Calculation",
    "Simplex Roving Production, Delivery Speed & TPI Calculation",
    "Ring Frame Production (g/spindle/shift) & TPI Calculation",
    "Auto Cone Winding Production (kg/drum/hr) Calculation"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-GD6G6ZF4KK"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GD6G6ZF4KK');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body>
        <div className="flex flex-col min-h-screen">
          <header className="bg-primary text-on-primary w-full h-16 flex items-center px-4 shadow-sm z-50 border-b border-outline-variant/20">
            <button
              type="button"
              className="mr-4 p-1 rounded hover:bg-white/10 text-on-primary hover:text-secondary transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>
            <Link href="/" className="flex flex-col group cursor-pointer" title="Spinning Calculator Home">
              <span className="headline-md font-bold leading-tight tracking-tight group-hover:text-secondary transition-colors">
                Spinning Calculator
              </span>
              <span className="text-xs text-on-primary/70 uppercase tracking-widest font-semibold">
                Fiber Technology
              </span>
            </Link>
            <div className="flex-1"></div>
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold tracking-wide transition-all mr-3 hidden sm:flex"
            >
              <Calculator className="w-4 h-4 text-secondary" aria-hidden="true" />
              All Modules
            </Link>
            <div
              className="p-1 rounded-full text-on-primary/80 hover:text-secondary transition-colors cursor-pointer"
              title="User Profile"
              aria-label="User Profile"
            >
              <User className="w-6 h-6" aria-hidden="true" />
            </div>
          </header>
          <main className="flex-1 w-full relative z-0">{children}</main>
        </div>
      </body>
    </html>
  );
}
