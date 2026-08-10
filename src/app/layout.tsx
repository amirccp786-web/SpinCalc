import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Spinning Calculator",
    default: "Spinning Calculator - Textile Mill Production Calculations",
  },
  description: "Advanced spinning calculator for textile engineering. Calculate production rates, efficiency, and yarn realization for Blow Room, Carding, Draw Frame, Simplex, Ring, and Auto Cone.",
  keywords: [
    "spinning calculator",
    "textile calculator",
    "yarn production calculator",
    "textile engineering calculations",
    "blow room calculator",
    "carding production calculator",
    "draw frame calculator",
    "simplex roving calculator",
    "ring spinning calculations",
    "auto cone winding calculator",
    "yarn realization",
    "textile mill software",
    "spinning mill calculations",
    "Pakistan spinning industry",
    "Pakistan textile calculator",
    "India textile manufacturing",
    "Indian spinning mills",
    "China textile industry",
    "Chinese yarn production",
    "Bangladesh RMG calculations",
    "Bangladesh textile spinning",
    "Vietnam spinning mills",
    "Turkey textile calculator",
    "Indonesia yarn manufacturing",
    "USA textile production",
    "Brazil spinning calculations",
    "Egypt cotton spinning",
    "textile mathematical formulas",
    "fiber technology calculations"
  ],
  authors: [{ name: "Fiber Technology" }],
  openGraph: {
    title: "Spinning Calculator - Textile Mill Production",
    description: "Advanced spinning calculator for textile engineering.",
    type: "website",
    locale: "en_US",
    siteName: "Spinning Calculator",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GR0K0MYRQL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GR0K0MYRQL');
          `}
        </Script>
      </head>
      <body>
        <div className="flex flex-col min-h-screen">
          <header className="bg-primary text-on-primary w-full h-16 flex items-center px-4 shadow-sm z-50 border-b border-outline-variant/20">
            <span className="material-symbols-outlined mr-4 cursor-pointer hover:text-secondary transition-colors">menu</span>
            <div className="flex flex-col">
              <h1 className="headline-md font-bold leading-tight tracking-tight">Spinning Calculator</h1>
              <span className="text-xs text-on-primary/70 uppercase tracking-widest font-semibold">Fiber Technology</span>
            </div>
            <div className="flex-1"></div>
            <span className="material-symbols-outlined cursor-pointer hover:text-secondary transition-colors" title="User Profile">account_circle</span>
          </header>
          <main className="flex-1 w-full relative z-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
