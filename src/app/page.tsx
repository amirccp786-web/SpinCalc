import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { SPINNING_PROCESS_STEPS } from "@/components/SpinningProcessNav";
import {
  CheckCircle,
  LayoutGrid,
  Globe2,
  Scale,
  ArrowRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "Spinning Calculator - Textile Mill Production, Draft & Twist Calculations",
  description:
    "Free textile spinning production calculators for Blow Room, Carding, Drawing, Comber, Simplex, Ring Frame, and Auto Cone winding efficiency, draft, noil, and twist calculations.",
  keywords: [
    "spinning calculator",
    "textile spinning production calculators",
    "textile mill calculators",
    "yarn production in bags per shift",
    "blow room production kg hr",
    "carding production calculator",
    "draw frame delivery speed",
    "comber noil percentage formula",
    "simplex roving twist multiplier",
    "ring frame production g spindle shift",
    "auto cone winding production",
    "Pakistan spinning mills",
    "India spinning industry",
    "Bangladesh textile RMG"
  ],
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
};

const TEXTILE_HUBS = [
  {
    country: "Pakistan",
    hubs: "Faisalabad, Lahore, Multan, Karachi",
    focus: "20s–30s carded & combed knitting yarns, open-end rotor denim yarns, and heavy weaving warp counts.",
    flag: "🇵🇰"
  },
  {
    country: "India",
    hubs: "Coimbatore, Tirupur, Ahmedabad, Surat",
    focus: "30s–40s combed compact hosiery, superfine 60s–80s warp yarns, and organic GOTS certified cottons.",
    flag: "🇮🇳"
  },
  {
    country: "Bangladesh",
    hubs: "Dhaka, Gazipur, Narayanganj, Chittagong",
    focus: "Export-grade 100% cotton combed knit yarns, composite spinning mills, and high-speed autoconer packages.",
    flag: "🇧🇩"
  }
];

const STANDARD_CONVERSIONS = [
  { label: "1 Commercial Bag", value: "100 lbs = 45.3592 kg" },
  { label: "1 Avoirdupois Pound (lb)", value: "7,000 grains = 453.592 grams" },
  { label: "1 Meter", value: "1.09361 yards = 39.3701 inches" },
  { label: "English Cotton Count (Ne)", value: "Number of 840-yard hanks per 1 lb" },
  { label: "Tex / Ne Conversion Factor", value: "Tex = 590.54 / Ne   (g/m = 0.5905 / Ne)" },
  { label: "Twist Per Inch (TPI)", value: "TPI = TM × √(Yarn Count Ne)" }
];

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-12 min-h-screen relative overflow-hidden">
      {/* Background decorations for a modern glassmorphic vibe */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero / Header Section with Single Descriptive H1 */}
      <header className="relative z-10 mb-12 text-center md:text-left pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
          <CheckCircle className="w-4 h-4 text-primary" aria-hidden="true" />
          Textile Mill Engineering Suite
        </div>
        <h1 className="headline-lg text-transparent bg-clip-text bg-gradient-to-r from-primary via-tertiary to-secondary">
          Textile Spinning Production Calculators
        </h1>
        <p className="body-md text-on-surface-variant mt-3 max-w-3xl leading-relaxed">
          Free textile spinning production calculators for Blow Room, Carding, Drawing, Comber, Simplex, Ring Frame, and Auto Cone winding efficiency, draft, noil, and twist calculations. Engineered for spinning supervisors, production managers, and textile engineers across Pakistan, India, and Bangladesh.
        </p>
      </header>

      {/* Module Grid: 7 Core Spinning Departments */}
      <section aria-labelledby="spinning-modules-heading" className="relative z-10 mb-14">
        <div className="flex items-center justify-between mb-6">
          <h2 id="spinning-modules-heading" className="headline-md text-on-surface flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-primary" aria-hidden="true" />
            Spinning Department Calculation Modules
          </h2>
          <span className="text-xs text-on-surface-variant font-jetbrains hidden sm:inline">
            7 Verified Engineering Modules
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPINNING_PROCESS_STEPS.map((calc, idx) => {
            const StepIcon = calc.icon;
            return (
              <Link href={calc.path} key={calc.path} className="group cursor-pointer">
                <article className="bg-surface-container/60 backdrop-blur-xl border border-outline-variant/30 rounded-2xl p-6 hover:border-primary/50 hover:bg-surface-variant/60 hover:shadow-[0_8px_30px_rgb(129,140,248,0.15)] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-jetbrains uppercase tracking-wider text-secondary bg-secondary-container/20 px-2.5 py-0.5 rounded">
                        {calc.stage}
                      </span>
                      <StepIcon className="w-6 h-6 text-on-surface-variant group-hover:text-primary transition-colors" aria-hidden="true" />
                    </div>
                    <h3 className="headline-md text-on-surface group-hover:text-primary transition-colors text-lg md:text-xl">
                      {calc.name} Calculator
                    </h3>
                    <p className="body-md text-on-surface-variant mt-2.5 leading-relaxed text-sm">
                      {calc.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-outline-variant/20 flex items-center justify-between text-xs">
                    <span className="font-jetbrains text-on-surface-variant">
                      {calc.outputUnit}
                    </span>
                    <span className="text-secondary font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Calculate
                      <ArrowRight className="w-4 h-4 text-secondary" aria-hidden="true" />
                    </span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Regional Spinning Mill Hubs Targeted */}
      <section aria-labelledby="regional-hubs-heading" className="relative z-10 mb-14 bg-surface-container-low/70 border border-outline-variant/30 rounded-2xl p-6 md:p-8">
        <h2 id="regional-hubs-heading" className="headline-md text-on-surface mb-2 flex items-center gap-2">
          <Globe2 className="w-5 h-5 text-secondary" aria-hidden="true" />
          Calibrated for South Asian Textile Manufacturing Hubs
        </h2>
        <p className="body-md text-on-surface-variant mb-6 text-sm">
          Formulas, constants, and shift outputs are configured to match local mill-floor practices, commercial 100-lb bag standards, and staple cotton varieties across Pakistan, India, and Bangladesh.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEXTILE_HUBS.map((hub, idx) => (
            <div key={idx} className="bg-surface-container/60 border border-outline-variant/20 rounded-xl p-5 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl" aria-hidden="true">{hub.flag}</span>
                <div>
                  <h3 className="text-base font-semibold text-on-surface">{hub.country}</h3>
                  <span className="text-xs text-primary font-jetbrains">{hub.hubs}</span>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                {hub.focus}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Standard Textile Spinning Constants & Unit Balances */}
      <section aria-labelledby="standard-constants-heading" className="relative z-10 bg-surface-container-lowest/80 border border-outline-variant/30 rounded-2xl p-6 md:p-8">
        <h2 id="standard-constants-heading" className="headline-md text-on-surface mb-2 flex items-center gap-2">
          <Scale className="w-5 h-5 text-tertiary" aria-hidden="true" />
          Universal Textile Spinning Constants & Conversions
        </h2>
        <p className="body-md text-on-surface-variant mb-6 text-sm">
          Quick reference for mathematical divisors, conversion factors, and physical constants used throughout staple fiber yarn manufacturing.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STANDARD_CONVERSIONS.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-lg border border-outline-variant/20 bg-surface-container/40 flex flex-col gap-1">
              <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                {item.label}
              </span>
              <span className="text-sm font-jetbrains text-on-surface font-medium">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
