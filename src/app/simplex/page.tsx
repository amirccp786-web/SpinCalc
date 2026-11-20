import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { SimplexCalculator } from "./SimplexCalculator";
import { TechnicalNotes, FormulaItem, VariableDef, WorkedExample, MillBenchmark } from "@/components/TechnicalNotes";
import { SpinningProcessNav } from "@/components/SpinningProcessNav";

export const metadata: Metadata = {
  title: "Simplex Roving Production, Delivery Speed & TPI Calculator",
  description:
    "Calculate speed frame (simplex) roving production in kg/spindle/hr, flyer delivery speed (m/min), and TPI from Twist Multiplier (TM) using verified textile spinning formulas.",
  keywords: [
    "simplex calculator",
    "speed frame roving production kg hr",
    "roving delivery speed m min",
    "roving TPI formula",
    "roving twist multiplier calculation",
    "textile simplex calculations"
  ],
  alternates: {
    canonical: "https://spincalc.vercel.app/simplex",
  },
  openGraph: {
    title: "Simplex Roving Production, Delivery Speed & TPI Calculator | SpinCalc",
    description:
      "Calculate roving production in kg/spindle/hr, delivery speed, and TPI using verified textile engineering equations.",
    url: "https://spincalc.vercel.app/simplex",
  },
};

const processDefinition =
  "The Simplex (Speed Frame / Roving Frame) is the intermediate attenuation and package-forming stage between finisher draw frame sliver and fine ring spun yarn. It drafts sliver into a slender roving strand (0.80 to 2.20 Ne) and inserts a modest protective twist (TM 1.10–1.35) so the roving can be wound onto bobbins and transported without stretching. Precise control of spindle speed, delivery speed (m/min), and twist per inch (TPI) is mandatory to prevent false drafting and ring frame creel breaks.";

const formulas: FormulaItem[] = [
  {
    name: "Twist Per Inch (TPI) from Twist Multiplier (TM)",
    formula: "TPI = TM × √(Roving Hank)",
    notes: "Roving twist multiplier (TM) typically ranges from 1.10 to 1.35. Higher TM is required for short staple fibers to prevent creel stretching."
  },
  {
    name: "Front Roller Delivery Speed (m/min)",
    formula: "Delivery Speed (m/min) = Spindle RPM / (TPI × 39.37)",
    notes: "39.37 is the exact number of inches in one meter, converting linear inches delivered per minute into meters per minute."
  },
  {
    name: "Production (kg / spindle / hr)",
    formula: "Production (kg/spindle/hr) = (Delivery Speed [m/min] × 60 × 0.5905 / (Roving Hank × 1000)) × (Eff % / 100)",
    notes: "The constant 0.5905 is derived from the exact English count conversion: Count in Tex = 590.54 / Ne. Therefore 1 meter of Ne roving weighs 0.5905 / Ne grams."
  }
];

const variables: VariableDef[] = [
  {
    symbol: "Spindle RPM",
    name: "Flyer Spindle Speed",
    unit: "RPM",
    description: "Rotational revolutions per minute of the flyer inserting twist into the roving strand.",
    typicalRange: "900 – 1,350 RPM"
  },
  {
    symbol: "Roving Hank",
    name: "Roving Linear Density",
    unit: "Ne",
    description: "English Cotton Count of the roving strand fed to the ring frame.",
    typicalRange: "0.80 – 2.00 Ne"
  },
  {
    symbol: "TM",
    name: "Twist Multiplier",
    unit: "constant",
    description: "Governing twist coefficient chosen according to cotton staple length and micronaire.",
    typicalRange: "1.10 – 1.35"
  },
  {
    symbol: "TPI",
    name: "Twist Per Inch",
    unit: "turns/inch",
    description: "Helical turns per inch inserted by the rotating flyer.",
    typicalRange: "1.00 – 1.65 TPI"
  },
  {
    symbol: "0.5905",
    name: "Tex / Ne Conversion Constant",
    unit: "g·Ne/m",
    description: "Derived from (453.592 g/lb) / (840 yd/hank × 0.9144 m/yd) = 0.59054.",
    typicalRange: "Exact Constant (0.5905)"
  }
];

const workedExample: WorkedExample = {
  title: "120-Spindle Simplex Frame Production",
  scenario:
    "A spinning mill in Faisalabad operates a 120-spindle roving frame at 1,000 RPM, producing 1.20 Ne roving with a Twist Multiplier (TM) of 1.15 and 88% operational efficiency.",
  givenInputs: [
    { label: "Spindle Speed", value: "1,000 RPM" },
    { label: "Roving Hank", value: "1.20 Ne" },
    { label: "Twist Multiplier (TM)", value: "1.15" },
    { label: "Spindles", value: "120 Spindles" },
    { label: "Efficiency", value: "88%" }
  ],
  steps: [
    {
      stepTitle: "Calculate Twist Per Inch (TPI)",
      formulaStr: "TPI = TM × √(Roving Hank)",
      calculationStr: "1.15 × √(1.20) = 1.15 × 1.0954",
      resultStr: "1.26 TPI"
    },
    {
      stepTitle: "Calculate Delivery Speed (m/min)",
      formulaStr: "Delivery Speed = Spindle RPM / (TPI × 39.37)",
      calculationStr: "1000 / (1.26 × 39.37) = 1000 / 49.61",
      resultStr: "20.16 m/min"
    },
    {
      stepTitle: "Calculate Hourly Production per Spindle",
      formulaStr: "kg/sp/hr = (Delivery Speed × 60 × 0.5905 / (Hank × 1000)) × (Eff / 100)",
      calculationStr: "(20.16 × 60 × 0.5905 / 1200) × 0.88 = (714.26 / 1200) × 0.88",
      resultStr: "0.5238 kg/spindle/hr"
    },
    {
      stepTitle: "Calculate Machine Shift Production (120 Spindles, 8 Hours)",
      formulaStr: "Shift kg = 0.5238 × 120 × 8 | Bags = (Shift kg × 2.20462) / 100",
      calculationStr: "502.85 kg × 2.20462 / 100",
      resultStr: "502.85 kg = 1,108.59 lbs = 11.09 Bags / shift"
    }
  ],
  finalResult: "0.524 kg/spindle/hr (11.09 bags / 8-hr shift, Delivery Speed: 20.16 m/min, TPI: 1.26)"
};

const benchmarks: MillBenchmark[] = [
  {
    title: "Punjab (Faisalabad & Multan)",
    region: "30s Carded & Combed",
    observation: "LMW LF1400 / LF1660 speed frames run at 1,050–1,150 RPM with 1.15–1.25 Ne roving hank and 1.15 TM."
  },
  {
    title: "Coimbatore (India)",
    region: "40s Combed Compact",
    observation: "Roving frames run fine roving (1.40–1.60 Ne) at 1,150–1,250 RPM. Strict tension control prevents false drafting."
  },
  {
    title: "Dhaka (Bangladesh)",
    region: "Export Composite Mills",
    observation: "Frames equipped with roving stop motions cycle doffs in under 3 minutes to maintain 90% shift efficiency."
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
          Simplex Roving Production, Delivery Speed & TPI Calculator
        </h1>
        <p className="body-md text-on-surface-variant mt-2 max-w-3xl leading-relaxed">
          Calculate speed frame (simplex) roving production in kg/spindle/hr, flyer delivery speed (m/min), and TPI from Twist Multiplier (TM) using verified textile spinning formulas.
        </p>
      </div>

      {/* Interactive Calculator */}
      <SimplexCalculator />

      {/* Crawlable Technical Formulas, Key & Worked Example */}
      <TechnicalNotes
        departmentTitle="Simplex (Speed Frame) Department"
        processDefinition={processDefinition}
        formulas={formulas}
        variables={variables}
        workedExample={workedExample}
        benchmarks={benchmarks}
      />

      {/* Internal Linking & Process Flow Navigation */}
      <SpinningProcessNav currentRoute="/simplex" />
    </div>
  );
}
