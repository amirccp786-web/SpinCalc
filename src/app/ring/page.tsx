import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { RingCalculator } from "./RingCalculator";
import { TechnicalNotes } from "@/components/TechnicalNotes";
import { SpinningProcessNav } from "@/components/SpinningProcessNav";

export const metadata: Metadata = {
  title: "Ring Frame Production & Twist Multiplier Calculator",
  description:
    "Calculate ring frame production in bags/shift, spindle speed (RPM), TPI, yarn count (Ne), and OPS for textile spinning mills in Faisalabad, Coimbatore, Tirupur, and Dhaka.",
  keywords: [
    "ring frame production calculator",
    "ring spinning production in bags",
    "spindle speed RPM calculation",
    "twist multiplier TM calculator",
    "TPI calculator textile",
    "ounces per spindle OPS formula",
    "grams per spindle GPS",
    "yarn count Ne calculation",
    "Rieter G38 ring frame",
    "LMW ring frame production",
    "compact spinning calculation"
  ],
  alternates: {
    canonical: "/ring",
  },
  openGraph: {
    title: "Ring Frame Production & Twist Multiplier Calculator | SpinCalc",
    description:
      "Calculate ring frame production in commercial 100-lb bags/shift, spindle RPM, TPI, OPS, and yarn count efficiency for spinning mills.",
    url: "https://spincalc.vercel.app/ring",
  },
};

const formulas = [
  {
    name: "Ring Frame Production (lbs / Spindle / 8-hr Shift)",
    formula: "lbs / Spindle = (Spindle RPM × 60 × 8 × (Eff% / 100)) / (TPI × 36 × 840 × Yarn Count Ne)",
    notes: "Multiply by total mill spindles and total frames to determine total mill shift output."
  },
  {
    name: "Ounces Per Spindle (OPS / 8-hr Shift)",
    formula: "OPS = (Total Shift Production in lbs / Total Spindles) × 16",
    notes: "Universal mill-floor efficiency benchmark across Pakistan, India, and Bangladesh. Grams per spindle (GPS) = OPS × 28.3495."
  },
  {
    name: "Twist Per Inch (TPI) & Twist Multiplier (TM)",
    formula: "TPI = TM × √(Yarn Count Ne)   ⟺   TM = TPI / √(Yarn Count Ne)",
    notes: "Standard hosiery TM is 3.50 – 3.75; weaving warp TM is 4.00 – 4.40."
  },
  {
    name: "Total Production in Commercial 100-lb Bags",
    formula: "Bags / Shift = Total Production (lbs / shift) / 100",
    notes: "Daily 24-hr bags = (Bags / Shift) × 3."
  }
];

const variables = [
  {
    symbol: "Spindle RPM",
    name: "Ring Spindle Rotational Speed",
    description: "Operating rotational speed of ring spindles driven by inverter tape drives.",
    typicalRange: "16,500 – 21,500 RPM"
  },
  {
    symbol: "Yarn Count (Ne)",
    name: "English Cotton Count",
    description: "Number of 840-yard hanks that weigh 1 pound. Higher number indicates finer yarn.",
    typicalRange: "10s – 80s Ne"
  },
  {
    symbol: "TPI",
    name: "Twist Per Inch",
    description: "Helical turns per inch inserted by the spinning traveler revolving along the ring flange.",
    typicalRange: "14.5 – 35.0 TPI"
  },
  {
    symbol: "Spindles / Frame",
    name: "Spindles per Ring Frame",
    description: "Number of active spindles per frame (typically 960 to 1,824 spindles on modern long frames).",
    typicalRange: "1,200 – 1,824 spindles"
  },
  {
    symbol: "Eff %",
    name: "Ring Frame Efficiency",
    description: "Uptime after deducting auto-doffer cycle time, pneumatic suction breaks, and pneumafil clearance.",
    typicalRange: "91% – 96%"
  }
];

const benchmarks = [
  {
    title: "Pakistan (Faisalabad, Lahore & Karachi)",
    region: "30s & 20s Carded & Combed",
    observation: "For 30s combed knit, spindles run 18,500–19,500 RPM at 93% efficiency with TM 3.65, achieving OPS of 3.85–4.15 oz/spindle (~28 bags/frame/day)."
  },
  {
    title: "India (Coimbatore & Tirupur)",
    region: "30s & 40s Combed Compact Hosiery",
    observation: "Equipped with Suessen or RoCoS compact systems, ring frames run at 20,000–21,500 RPM with low end-breakage rates (< 8 breaks/1000 sp-hr)."
  },
  {
    title: "Bangladesh (Dhaka, Gazipur & Narayanganj)",
    region: "100% Export Knit Mills",
    observation: "Ring frames operating 1,600+ spindles average 94% efficiency, delivering consistent count CV% below 1.2% for high-speed circular knitting machines."
  }
];

export default function RingPage() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-12 min-h-screen">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-4 text-xs font-jetbrains text-on-surface-variant flex items-center gap-2">
        <Link href="/" className="hover:text-primary transition-colors">SpinCalc</Link>
        <span>/</span>
        <span className="text-secondary">Stage 06</span>
        <span>/</span>
        <span className="text-on-surface">Ring Frame</span>
      </nav>

      {/* Page Title & Context */}
      <div className="mb-8">
        <h1 className="headline-lg text-on-surface tracking-tight">
          Ring Frame Production & Twist Multiplier Calculator
        </h1>
        <p className="body-md text-on-surface-variant mt-2 max-w-3xl leading-relaxed">
          Calculate ring frame production in commercial 100-lb bags/shift, spindle speed (RPM), TPI, yarn count (Ne), ounces per spindle (OPS), and twist multiplier for cotton and blended spinning mills.
        </p>
      </div>

      {/* Interactive Calculator */}
      <RingCalculator />

      {/* Crawlable Technical Formulas & Engineering Notes */}
      <TechnicalNotes
        departmentTitle="Ring Spinning Department"
        formulas={formulas}
        variables={variables}
        benchmarks={benchmarks}
        technicalOverview="The Ring Spinning frame is the definitive production and quality benchmark of any staple fiber spinning mill. It finalizes the drafting attenuation of the roving strand down to the required nominal yarn count (Ne), inserts the governing helical structural twist via the high-speed traveler and ring flange, and winds the spun yarn onto ring cops. Ring frame production output in commercial 100-lb bags, ounces per spindle (OPS), and grams per spindle (GPS) determines daily mill profitability and electrical energy utilization (kWh/kg)."
      />

      {/* Internal Linking & Process Flow Navigation */}
      <SpinningProcessNav currentRoute="/ring" />
    </div>
  );
}
