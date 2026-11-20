import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { SPINNING_PROCESS_STEPS } from "@/components/SpinningProcessNav";

export const metadata: Metadata = {
  title: "Textile Spinning Mill Production Calculators & Engineering Formulas",
  description:
    "Professional online spinning calculator suite for textile engineers, spinning mill managers, and production supervisors in Pakistan (Faisalabad, Lahore, Karachi), India (Coimbatore, Tirupur, Ahmedabad), and Bangladesh (Dhaka, Gazipur). Calculate production in bags/shift, spindle speed (RPM), twist multiplier (TM), hank, count Ne, and draft across all spinning departments.",
  keywords: [
    "spinning calculator",
    "textile mill production calculator",
    "textile engineering calculators",
    "yarn production in bags per shift",
    "twist multiplier calculator textile",
    "spindle speed calculation",
    "yarn realization formula",
    "Faisalabad textile spinning calculator",
    "Coimbatore spinning mills software",
    "Bangladesh RMG textile calculations",
    "Blow room to auto cone calculation"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Textile Spinning Mill Production Calculators | SpinCalc",
    description:
      "Engineered for spinning mill engineers in Pakistan, India, and Bangladesh. Fast, accurate production calculations in bags/shift, kgs, and spindle RPM from Blow Room to Auto Cone.",
    url: "https://spincalc.vercel.app",
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
  { label: "English Cotton Count (Ne)", value: "Number of 840-yard hanks per 1 lb" },
  { label: "Metric Sliver Hank (ktex)", value: "Grams per meter (g/m) = 8.33 / Ne" },
  { label: "Twist Per Inch (TPI)", value: "TPI = TM × √(Yarn Count Ne)" },
  { label: "1 Meter", value: "1.0936 yards = 39.37 inches" }
];

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-12 min-h-screen relative overflow-hidden">
      {/* Background decorations for a modern glassmorphic vibe */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero / Header Section with Primary H1 */}
      <header className="relative z-10 mb-12 text-center md:text-left pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
          <span className="material-symbols-outlined text-[16px]">verified</span>
          Textile Mill Engineering Suite
        </div>
        <h1 className="headline-lg text-transparent bg-clip-text bg-gradient-to-r from-primary via-tertiary to-secondary">
          Textile Spinning Mill Production Calculators
        </h1>
        <p className="body-md text-on-surface-variant mt-3 max-w-3xl leading-relaxed">
          Engineered specifically for textile engineers, mill general managers, spinning supervisors, and quality controllers across <strong>Pakistan (Faisalabad, Lahore, Karachi)</strong>, <strong>India (Coimbatore, Tirupur, Ahmedabad)</strong>, and <strong>Bangladesh (Dhaka, Gazipur)</strong>. Compute production in bags/shift, spindle speed, twist multiplier (TM), hank, and line efficiency across the entire spinning flow.
        </p>
      </header>

      {/* Module Grid: 7 Core Spinning Departments */}
      <section aria-labelledby="spinning-modules-heading" className="relative z-10 mb-14">
        <div className="flex items-center justify-between mb-6">
          <h2 id="spinning-modules-heading" className="headline-md text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">view_quilt</span>
            Department Calculation Modules
          </h2>
          <span className="text-xs text-on-surface-variant font-jetbrains hidden sm:inline">
            7 Interactive Engineering Calculators
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPINNING_PROCESS_STEPS.map((calc, idx) => (
            <Link href={calc.path} key={calc.path} className="group">
              <article className="bg-surface-container/60 backdrop-blur-xl border border-outline-variant/30 rounded-2xl p-6 hover:border-primary/50 hover:bg-surface-variant/60 hover:shadow-[0_8px_30px_rgb(129,140,248,0.15)] hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-jetbrains uppercase tracking-wider text-secondary bg-secondary-container/20 px-2.5 py-0.5 rounded">
                      {calc.stage}
                    </span>
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-2xl">
                      {calc.icon}
                    </span>
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
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Regional Spinning Mill Hubs Targeted */}
      <section aria-labelledby="regional-hubs-heading" className="relative z-10 mb-14 bg-surface-container-low/70 border border-outline-variant/30 rounded-2xl p-6 md:p-8">
        <h2 id="regional-hubs-heading" className="headline-md text-on-surface mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">public</span>
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
          <span className="material-symbols-outlined text-tertiary">balance</span>
          Universal Textile Spinning Constants & Conversions
        </h2>
        <p className="body-md text-on-surface-variant mb-6 text-sm">
          Quick reference for mathematical divisors and physical constants used throughout staple fiber yarn manufacturing.
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
