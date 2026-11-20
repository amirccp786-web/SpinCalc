import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { ComberCalculator } from "./ComberCalculator";
import { TechnicalNotes, FormulaItem, VariableDef, WorkedExample, MillBenchmark } from "@/components/TechnicalNotes";
import { SpinningProcessNav } from "@/components/SpinningProcessNav";

export const metadata: Metadata = {
  title: "Comber Production & Noil Percentage Calculator",
  description:
    "Calculate comber production in kg/hr, nips per minute, feed per nip (mm), lap weight (g/m), and noil extraction percentage using verified textile formulas.",
  keywords: [
    "comber calculator",
    "comber production kg hr formula",
    "comber noil percentage calculation",
    "nips per minute comber",
    "feed per nip mm",
    "textile combing formulas"
  ],
  alternates: {
    canonical: "https://spincalc.vercel.app/comber",
  },
  openGraph: {
    title: "Comber Production & Noil Percentage Calculator | SpinCalc",
    description:
      "Calculate comber production in kg/hr and bags, nips/min, feed per nip, and noil extraction percentage using verified textile engineering equations.",
    url: "https://spincalc.vercel.app/comber",
  },
};

const processDefinition =
  "The Comber extracts fibers below a preset cut-off length (typically < 14–16 mm), clears out residual micro-neps, eliminates remaining seed fragments, and parallelizes fiber hooks. Measuring nip frequency (nips/min), feed step per nip (mm), and noil extraction percentage is crucial to managing the balance between yarn tensile strength (CSP) and raw cotton realization.";

const formulas: FormulaItem[] = [
  {
    name: "Comber Production Rate (kg/hr)",
    formula: "Production (kg/hr) = (Nips/min × Feed/nip [mm] × Lap Weight [g/m] × Heads × 60 / 1,000,000) × (1 - Noil % / 100) × (Eff % / 100)",
    notes: "Nips/min × Feed/nip (mm) gives linear speed in mm/min. Multiplying by 60 and dividing by 1,000,000 converts feed mm to meters and lap grams to kilograms per hour."
  },
  {
    name: "Noil Extraction Percentage",
    formula: "Noil % = (Noil Weight / (Noil Weight + Combed Sliver Weight)) × 100",
    notes: "Directly determines yarn realization: Every 1% increase in comber noil decreases overall mill yarn realization by approximately 0.85%."
  },
  {
    name: "Lap Weight Unit Conversion (grains/yd to g/m)",
    formula: "Lap (g/m) = Lap (grains/yd) / 14.17",
    notes: "A standard comber lap of 1000 grains/yard corresponds to ~70.56 g/m."
  }
];

const variables: VariableDef[] = [
  {
    symbol: "Nips / min",
    name: "Combing Nipping Frequency",
    unit: "nips/min",
    description: "Frequency of nipping, combing, and detaching cycles per minute.",
    typicalRange: "350 – 500 nips/min"
  },
  {
    symbol: "Feed / nip",
    name: "Feed Distance per Nip Cycle",
    unit: "mm",
    description: "Linear length of lap sheet advanced by the feed roller into the nipper jaws per nip cycle.",
    typicalRange: "4.3 – 5.5 mm"
  },
  {
    symbol: "Lap Weight",
    name: "Infeed Lap Linear Density",
    unit: "g/m",
    description: "Mass density of the lap sheet delivered from the lap former.",
    typicalRange: "65 – 80 g/m (900 – 1150 gr/yd)"
  },
  {
    symbol: "Noil %",
    name: "Short Fiber Extraction Ratio",
    unit: "%",
    description: "Percentage of short fibers and neps extracted as waste.",
    typicalRange: "12% – 20%"
  },
  {
    symbol: "Heads",
    name: "Combing Heads",
    unit: "heads",
    description: "Independent combing stations delivering to a common drawbox.",
    typicalRange: "8 heads per frame"
  }
];

const workedExample: WorkedExample = {
  title: "8-Head High-Performance Comber Output",
  scenario:
    "A spinning mill in Tirupur runs an 8-head comber at 400 nips/min, 5.0 mm feed per nip, 70 g/m lap weight, with 16% noil extraction and 85% operating efficiency.",
  givenInputs: [
    { label: "Nips per Minute", value: "400 nips/min" },
    { label: "Feed per Nip", value: "5.0 mm" },
    { label: "Lap Weight", value: "70 g/m" },
    { label: "Heads", value: "8 Heads" },
    { label: "Noil Extraction", value: "16%" },
    { label: "Efficiency", value: "85%" }
  ],
  steps: [
    {
      stepTitle: "Calculate Theoretical Gross Infeed Throughput",
      formulaStr: "Gross kg/hr = (Nips × Feed × Lap Weight × Heads × 60) / 1,000,000",
      calculationStr: "(400 × 5.0 × 70 × 8 × 60) / 1,000,000 = 67,200,000 / 1,000,000",
      resultStr: "67.20 kg/hr infeed"
    },
    {
      stepTitle: "Apply 16% Noil Waste Extraction",
      formulaStr: "Combed Sliver kg/hr = Gross kg/hr × (1 - 0.16)",
      calculationStr: "67.20 × 0.84",
      resultStr: "56.45 kg/hr (100% Eff)"
    },
    {
      stepTitle: "Apply 85% Operating Efficiency",
      formulaStr: "Actual kg/hr = 56.45 × (85 / 100)",
      calculationStr: "56.45 × 0.85",
      resultStr: "47.98 kg/hr per machine"
    },
    {
      stepTitle: "Calculate 8-Hour Shift Production in Commercial 100-lb Bags",
      formulaStr: "Shift kg = 47.98 × 8 = 383.84 kg | Bags = (383.84 × 2.20462) / 100",
      calculationStr: "383.84 × 2.20462 / 100",
      resultStr: "383.84 kg = 846.22 lbs = 8.46 Bags / shift"
    }
  ],
  finalResult: "47.98 kg/hr (8.46 bags / 8-hr shift, 6.00 kg/hr/head)"
};

const benchmarks: MillBenchmark[] = [
  {
    title: "Tirupur (India)",
    region: "30s & 40s Combed Hosiery",
    observation: "Rieter E86 combers run at 450–500 nips/min with 14%–16% noil extraction, producing premium knit yarns."
  },
  {
    title: "Faisalabad (Pakistan)",
    region: "Export Combed Yarns",
    observation: "Mills operate at 380–430 nips/min with 15%–18% noil to satisfy strict export tensile strength (CSP > 2600)."
  },
  {
    title: "Gazipur (Bangladesh)",
    region: "Export Composite Knit",
    observation: "8-head combers running at 420 nips/min maintain comber sliver CVm% strictly below 3.0%."
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
          Comber Production & Noil Percentage Calculator
        </h1>
        <p className="body-md text-on-surface-variant mt-2 max-w-3xl leading-relaxed">
          Calculate comber production in kg/hr, shift output in commercial 100-lb bags, nips per minute, feed per nip (mm), lap linear weight, and noil waste percentage using verified textile formulas.
        </p>
      </div>

      {/* Interactive Calculator */}
      <ComberCalculator />

      {/* Crawlable Technical Formulas, Key & Worked Example */}
      <TechnicalNotes
        departmentTitle="Combing Department"
        processDefinition={processDefinition}
        formulas={formulas}
        variables={variables}
        workedExample={workedExample}
        benchmarks={benchmarks}
      />

      {/* Internal Linking & Process Flow Navigation */}
      <SpinningProcessNav currentRoute="/comber" />
    </div>
  );
}
