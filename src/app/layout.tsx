import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://spincalc.vercel.app"),
  title: {
    template: "%s | Spinning Calculator",
    default: "Spinning Calculator - Textile Mill Production Calculations & Engineering Formulas",
  },
  description:
    "Advanced spinning calculator for textile engineers, production managers, and spinning mill supervisors in Pakistan (Faisalabad, Lahore, Karachi), India (Coimbatore, Tirupur, Ahmedabad), and Bangladesh (Dhaka, Gazipur). Calculate production in bags/shift and kgs, yarn realization, twist multiplier (TM), hank, count Ne, spindle speed, and draft across Blow Room, Carding, Drawing, Combing, Simplex, Ring Frame, and Auto Cone.",
  keywords: [
    "spinning calculator",
    "textile calculator",
    "yarn production calculator",
    "spinning mill calculations",
    "textile engineering formulas",
    "yarn realization calculator",
    "ring frame production in bags",
    "twist multiplier calculator",
    "TPI calculator",
    "spindle speed RPM",
    "ounces per spindle OPS",
    "carding production kg hr",
    "blow room calculator",
    "draw frame delivery speed",
    "comber noil percentage",
    "simplex roving hank",
    "auto cone winding production",
    "Pakistan spinning industry",
    "Faisalabad textile spinning",
    "Lahore spinning mills",
    "Karachi textile mills",
    "India textile manufacturing",
    "Coimbatore spinning mills",
    "Tirupur hosiery yarn calculation",
    "Ahmedabad cotton textile",
    "Bangladesh RMG spinning",
    "Dhaka spinning mills",
    "Gazipur textile production",
    "English count Ne calculation",
    "fiber technology calculations"
  ],
  authors: [{ name: "Fiber Technology Textile Engineering Team" }],
  creator: "Fiber Technology",
  publisher: "Spinning Calculator",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Spinning Calculator - Textile Mill Production Calculations",
    description:
      "Engineered for textile engineers and spinning mill supervisors in South Asia. Real-time production in bags/shift, twist multiplier, spindle speed, and efficiency for Blow Room, Card, Drawing, Comber, Simplex, Ring, and Auto Cone.",
    url: "https://spincalc.vercel.app",
    siteName: "Spinning Calculator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spinning Calculator - Textile Mill Production Calculations",
    description:
      "Advanced textile spinning calculations for mill engineers: production in bags/shift, TPI, TM, hank, count Ne, and efficiency.",
  },
  other: {
    "geo.region": "PK-PB;PK-SD;IN-TN;IN-GJ;BD-C",
    "geo.placename": "Faisalabad, Lahore, Karachi, Coimbatore, Tirupur, Ahmedabad, Dhaka, Gazipur",
    "target-audience":
      "Textile Engineers, Spinning Mill Managers, Production Supervisors, Quality Control Officers",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Spinning Calculator",
  url: "https://spincalc.vercel.app",
  applicationCategory: "BusinessApplication",
  operatingSystem: "All",
  browserRequirements: "Requires JavaScript. Requires HTML5.",
  audience: {
    "@type": "Audience",
    audienceType: "Textile Engineers, Spinning Mill Managers, Production Supervisors",
    geographicArea: [
      { "@type": "AdministrativeArea", name: "Pakistan (Faisalabad, Lahore, Karachi)" },
      { "@type": "AdministrativeArea", name: "India (Coimbatore, Tirupur, Ahmedabad)" },
      { "@type": "AdministrativeArea", name: "Bangladesh (Dhaka, Gazipur)" }
    ]
  },
  description:
    "Comprehensive spinning mill calculation suite for cotton and blended yarn manufacturing. Computes production rates in bags and kilograms, machine efficiencies, draft, hank, twist per inch (TPI), twist multiplier (TM), and spindle RPM.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "Blow Room Production & Scutcher RPM Calculation",
    "Carding Machine Production & Sliver Hank Calculation",
    "Draw Frame Delivery & Sliver Weight Calculation",
    "Comber Production & Noil Percentage Calculation",
    "Simplex Roving Production & Twist Multiplier (TM) Calculation",
    "Ring Frame Production in Bags/Shift & Spindle Speed (RPM) Calculation",
    "Auto Cone Winding Production & Efficiency Calculation"
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
            <span
              className="material-symbols-outlined mr-4 cursor-pointer hover:text-secondary transition-colors"
              aria-label="Navigation Menu"
            >
              menu
            </span>
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
              <span className="material-symbols-outlined text-[16px]">calculate</span>
              All Modules
            </Link>
            <span
              className="material-symbols-outlined cursor-pointer hover:text-secondary transition-colors"
              title="User Profile"
              aria-label="User Profile"
            >
              account_circle
            </span>
          </header>
          <main className="flex-1 w-full relative z-0">{children}</main>
        </div>
      </body>
    </html>
  );
}
