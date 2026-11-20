import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { SimplexCalculator } from "./SimplexCalculator";
import { TechnicalNotes } from "@/components/TechnicalNotes";
import { SpinningProcessNav } from "@/components/SpinningProcessNav";

export const metadata: Metadata = {
  title: "Simplex Roving Production & Twist Multiplier Calculator",
  description:
    "Calculate speed frame (simplex) roving production in lbs/shift, 100-lb bags/day, flyer spindle speed (RPM), roving hank (Ne), and TPI for spinning mills in Faisalabad, Coimbatore, and Dhaka.",
  keywords: [
    "simplex calculator",
    "speed frame production calculation",
    "roving hank calculation",
    "roving twist multiplier TM",
    "simplex flyer speed RPM",
    "roving TPI formula",
    "Electro-Jet roving frame",
    "LMW LF1660 speed frame",
    "textile roving calculations"
  ],
  alternates: {
    canonical: "/simplex",
  },
  openGraph: {
    title: "Simplex Roving Production & Twist Multiplier Calculator | SpinCalc",
    description:
      "Calculate roving frame production in lbs/shift and bags, flyer spindle speeds up to 1400 RPM, roving hank Ne, and twist multiplier.",
    url: "https://spincalc.vercel.app/simplex",
  },
};

const formulas = [
  {
    name: "Simplex Production in lbs / 8-hr Shift",
    formula: "Production (lbs/shift) = (Spindle Speed (RPM) × 60 × 8 × (Eff% / 100) × Spindles) / (TPI × 36 × 840 × Roving Hank Ne)",
    notes: "Where 36 converts inches to yards and 840 is the standard English Cotton Count hank constant."
  },
  {
    name: "Twist Per Inch (TPI) from Twist Multiplier (TM)",
    formula: "TPI = TM × √(Roving Hank Ne)",
    notes: "For roving: TM is maintained between 1.10 and 1.35 to balance unwinding strength vs ring draftability."
  },
  {
    name: "Flyer Delivery Speed in inches/min",
    formula: "Delivery Speed (in/min) = Spindle RPM / TPI",
    notes: "Convert to meters/min by multiplying by 0.0254."
  },
  {
    name: "Production in Commercial 100-lb Bags",
    formula: "Bags / Shift = Total Production (lbs / shift) / 100",
    notes: "Directly determines the number of roving bobbins required to feed ring frame creels."
  }
];

const variables = [
  {
    symbol: "Spindle Speed",
    name: "Flyer Spindle RPM",
    description: "Revolutions per minute of the suspended flyer inserting twist into the roving strand.",
    typicalRange: "900 – 1,350 RPM"
  },
  {
    symbol: "Roving Hank (Ne)",
    name: "English Cotton Count of Roving",
    description: "Fineness of roving. Lower counts (0.8–1.0 Ne) feed coarse ring yarns; higher counts (1.2–2.0 Ne) feed fine counts.",
    typicalRange: "0.80 – 2.20 Ne"
  },
  {
    symbol: "TPI",
    name: "Twist Per Inch",
    description: "Number of helical turns inserted per inch of roving to withstand bobbin winding and creel unwinding.",
    typicalRange: "1.00 – 1.65 TPI"
  },
  {
    symbol: "Spindles",
    name: "Spindles per Speed Frame",
    description: "Total roving bobbin positions mounted on the machine frame.",
    typicalRange: "120 – 160 spindles"
  },
  {
    symbol: "Eff %",
    name: "Operational Efficiency",
    description: "Accounts for automatic doffing cycles, roving end breaks, bobbin rail reversal, and creel changes.",
    typicalRange: "86% – 92%"
  }
];

const benchmarks = [
  {
    title: "Punjab (Faisalabad & Multan)",
    region: "30s Carded & Combed Knit",
    observation: "LMW LF1400 / LF1660 frames run at 1,050–1,150 RPM with 1.15–1.25 Ne roving hank and 1.15 TM, yielding 88% overall shift efficiency."
  },
  {
    title: "Tamil Nadu (Coimbatore & Dindigul)",
    region: "40s & 50s Combed Compact",
    observation: "Roving frames run fine roving (1.40–1.60 Ne) at 1,150–1,250 RPM. Strict tension control prevents false drafting along the flyer leg."
  },
  {
    title: "Bangladesh (Dhaka & Gazipur)",
    region: "Export Quality Composite Mills",
    observation: "Modern frames equipped with roving stop motions and auto-doffers cycle doffs in under 3 minutes to maximize shift output."
  }
];

export default function SimplexPage() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-12 min-h-screen">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-4 text-xs font-jetbrains text-on-surface-variant flex items-center gap-2">
        <Link href="/" className="hover:text-primary transition-colors">SpinCalc</Link>
        <span>/</span>
        <span className="text-secondary">Stage 05</span>
        <span>/</span>
        <span className="text-on-surface">Simplex</span>
      </nav>

      {/* Page Title & Context */}
      <div className="mb-8">
        <h1 className="headline-lg text-on-surface tracking-tight">
          Simplex Roving Production & Twist Multiplier Calculator
        </h1>
        <p className="body-md text-on-surface-variant mt-2 max-w-3xl leading-relaxed">
          Calculate speed frame (simplex) roving production in lbs/shift, 100-lb bags/day, flyer spindle speed (RPM), roving hank (Ne), and TPI for cotton and blended yarn manufacturing.
        </p>
      </div>

      {/* Interactive Calculator */}
      <SimplexCalculator />

      {/* Crawlable Technical Formulas & Engineering Notes */}
      <TechnicalNotes
        departmentTitle="Simplex (Speed Frame) Department"
        formulas={formulas}
        variables={variables}
        benchmarks={benchmarks}
        technicalOverview="The Simplex (Speed Frame / Roving Frame) represents the intermediate thinning process bridging heavy finisher sliver and fine ring spun yarn. It attenuates the draw frame sliver into an even, slender roving strand (0.80 to 2.20 Ne) and inserts a modest protective twist (1.10–1.35 TM) so the roving can be wound onto bobbins and transported without stretching. Precise control of spindle speed, roving hank, and twist multiplier is mandatory: insufficient twist causes roving breakage in the creel, while excessive twist impedes the break draft on ring spinning frames."
      />

      {/* Internal Linking & Process Flow Navigation */}
      <SpinningProcessNav currentRoute="/simplex" />
    </div>
  );
}
