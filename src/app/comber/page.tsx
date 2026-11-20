import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { ComberCalculator } from "./ComberCalculator";
import { TechnicalNotes } from "@/components/TechnicalNotes";
import { SpinningProcessNav } from "@/components/SpinningProcessNav";

export const metadata: Metadata = {
  title: "Comber Production & Noil Extraction Calculator",
  description:
    "Calculate comber production in lbs/shift, bags/day, nips per minute, feed per nip (mm), and noil extraction percentage for combed cotton spinning mills in Tirupur, Faisalabad, and Dhaka.",
  keywords: [
    "comber calculator",
    "comber production calculation",
    "comber noil percentage",
    "nips per minute comber",
    "feed per nip calculation",
    "combed yarn realization",
    "Rieter comber E86 production",
    "comber lap weight grains per yard",
    "textile combing calculations"
  ],
  alternates: {
    canonical: "/comber",
  },
  openGraph: {
    title: "Comber Production & Noil Extraction Calculator | SpinCalc",
    description:
      "Calculate comber machine production, nips/min, feed per nip, and noil waste percentage for premium combed cotton yarns.",
    url: "https://spincalc.vercel.app/comber",
  },
};

const formulas = [
  {
    name: "Comber Shift Production in lbs / 8-hr Shift",
    formula: "Production (lbs/shift) = (Speed (m/min) × 60 × 8 × (Eff% / 100) × Lap gr/yd × 1.0936 × (1 - Noil% / 100) × Heads) / 7,000",
    notes: "Where linear speed (m/min) = (Nips/min × Feed per Nip in mm) / 1,000."
  },
  {
    name: "Comber Production in kg/hr per Machine",
    formula: "Production (kg/hr) = (Nips/min × Feed (mm) × 60 × Lap (g/m) × (1 - Noil% / 100) × Eff% × Heads) / 10^8",
    notes: "Metric formula for modern comber control units calibrated in grams per meter (g/m) of combed lap."
  },
  {
    name: "Noil Extraction Percentage",
    formula: "Noil % = (Weight of Noil Extracted / Total Lap Fed) × 100",
    notes: "Directly determines yarn realization: Every 1% increase in comber noil decreases overall mill yarn realization by ~0.85%."
  },
  {
    name: "Production in Commercial 100-lb Bags",
    formula: "Bags / Shift = Total Production (lbs / shift) / 100",
    notes: "Multiply by 3 for 24-hour daily output."
  }
];

const variables = [
  {
    symbol: "Nips / min",
    name: "Combing Nipping Frequency",
    description: "Number of nipping and detaching cycles per minute executed by the nipper assembly and circular comb.",
    typicalRange: "350 – 500 nips/min"
  },
  {
    symbol: "Feed / nip",
    name: "Lap Feed Distance per Cycle",
    description: "Linear length of lap sheet advanced by the feed roller into the nipper jaws per nip cycle.",
    typicalRange: "4.3 – 5.5 mm"
  },
  {
    symbol: "Lap Weight",
    name: "Comber Infeed Lap Weight",
    description: "Heavy sliver lap prepared on the lap former / sliver lap machine.",
    typicalRange: "900 – 1,200 grains/yd (65 – 85 g/m)"
  },
  {
    symbol: "Noil %",
    name: "Short Fiber Extraction Ratio",
    description: "Percentage of short fibers (< 16 mm), remaining neps, and seed-coat fragments removed as waste.",
    typicalRange: "12% – 22%"
  },
  {
    symbol: "Heads",
    name: "Number of Combing Heads",
    description: "Independent combing stations per frame delivering to a common drawbox.",
    typicalRange: "8 heads per machine"
  }
];

const benchmarks = [
  {
    title: "Tirupur & Coimbatore (Tamil Nadu)",
    region: "30s & 40s Combed Hosiery",
    observation: "Rieter E86 and Toyota combers run at 450–500 nips/min with 14%–16% noil extraction, producing premium knit yarns with 50% fewer yarn faults."
  },
  {
    title: "Faisalabad & Lahore (Punjab)",
    region: "Export Combed Weaving & Knitting",
    observation: "Mills running Shankar-6 / Pakistani cotton operate at 380–440 nips/min with 15%–18% noil to satisfy strict export tensile strength (CSP > 2600)."
  },
  {
    title: "Dhaka & Gazipur (Bangladesh)",
    region: "RMG Export Knitted Fabrics",
    observation: "Leading composite mills run 8-head combers at 420 nips/min with 16% noil, maintaining comber sliver CVm% under 3.0%."
  }
];

export default function ComberPage() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-12 min-h-screen">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-4 text-xs font-jetbrains text-on-surface-variant flex items-center gap-2">
        <Link href="/" className="hover:text-primary transition-colors">SpinCalc</Link>
        <span>/</span>
        <span className="text-secondary">Stage 04</span>
        <span>/</span>
        <span className="text-on-surface">Comber</span>
      </nav>

      {/* Page Title & Context */}
      <div className="mb-8">
        <h1 className="headline-lg text-on-surface tracking-tight">
          Comber Production & Noil Extraction Calculator
        </h1>
        <p className="body-md text-on-surface-variant mt-2 max-w-3xl leading-relaxed">
          Calculate combing machine production in lbs/shift, 100-lb bags/day, nips per minute, feed per nip (mm), lap linear weight, and noil waste percentage for combed cotton spinning.
        </p>
      </div>

      {/* Interactive Calculator */}
      <ComberCalculator />

      {/* Crawlable Technical Formulas & Engineering Notes */}
      <TechnicalNotes
        departmentTitle="Combing Department"
        formulas={formulas}
        variables={variables}
        benchmarks={benchmarks}
        technicalOverview="The Combing operation represents the decisive quality upgrade step distinguishing premium combed yarns from standard carded yarns. The comber extracts fibers below a preset cut-off length (typically < 14–16 mm), clears out residual micro-neps, eliminates remaining seed fragments, and meticulously straightens fiber hooks. Accurately configuring nip frequency (350–500 nips/min), feed step per nip (4.3–5.5 mm), and noil extraction percentage (12%–22%) strikes the crucial economic balance between yarn tensile strength (CSP), Uster evenness, and overall mill yarn realization."
      />

      {/* Internal Linking & Process Flow Navigation */}
      <SpinningProcessNav currentRoute="/comber" />
    </div>
  );
}
