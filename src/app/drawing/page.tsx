import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { DrawingCalculator } from "./DrawingCalculator";
import { TechnicalNotes, FormulaItem, VariableDef, WorkedExample, MillBenchmark } from "@/components/TechnicalNotes";
import { SpinningProcessNav } from "@/components/SpinningProcessNav";

export const metadata: Metadata = {
  title: "Draw Frame Production & Delivery Speed Calculator",
  description:
    "Calculate draw frame production in lbs/shift, commercial 100-lb bags, delivery speed (m/min), and sliver weight (grains/yd) using standard textile spinning formulas.",
  keywords: [
    "draw frame calculator",
    "draw frame production lbs shift formula",
    "draw frame delivery speed m min",
    "draw frame sliver grains yard",
    "textile drawing calculations",
    "draw frame bags shift"
  ],
  alternates: {
    canonical: "https://spincalc.vercel.app/drawing",
  },
  openGraph: {
    title: "Draw Frame Production & Delivery Speed Calculator | SpinCalc",
    description:
      "Calculate draw frame output in lbs/shift and bags, delivery speeds, and sliver grains/yard using verified textile engineering equations.",
    url: "https://spincalc.vercel.app/drawing",
  },
};

const processDefinition =
  "The Draw Frame performs fiber parallelization through roller drafting and mass homogenization through doubling (feeding 6 to 8 slivers simultaneously). High-speed autoleveller draw frames continuously scan entering mass variations and adjust dynamic drafting ratios within milliseconds. Calculating delivery speed (m/min), sliver linear density (grains/yard), and deliveries per machine is critical to suppressing short-term drafting waves and achieving low yarn count CV%.";

const formulas: FormulaItem[] = [
  {
    name: "Draw Frame Shift Production (lbs / 8-hr Shift)",
    formula: "Production (lbs/shift) = (Delivery Speed [m/min] × 60 × 8 × (Eff % / 100) × Sliver [grains/yd] × 1.0936 × Deliveries) / 7,000",
    notes: "Applies to both breaker frames (typically 2 deliveries) and finisher autoleveller frames (typically 1 delivery). Divide lbs by 100 for commercial bags."
  },
  {
    name: "Draw Frame Daily Production (24 Hours)",
    formula: "Daily Output = Shift Production (lbs / 8-hr) × 3   ⟹   Daily Bags = Daily lbs / 100",
    notes: "Multiply shift output by 3 for 24-hour mill-floor scheduling."
  },
  {
    name: "Metric Unit Balance (kg/shift)",
    formula: "Production (kg/shift) = Production (lbs/shift) / 2.20462",
    notes: "1 commercial textile bag (100 lbs) equals 45.3592 kg."
  }
];

const variables: VariableDef[] = [
  {
    symbol: "Delivery Speed",
    name: "Calender Delivery Speed",
    unit: "m/min",
    description: "Linear rate of delivered sliver passing through the calendar rollers into the coiler.",
    typicalRange: "400 – 850 m/min"
  },
  {
    symbol: "Sliver Weight",
    name: "Delivered Sliver Linear Density",
    unit: "grains/yd",
    description: "Weight per unit length of the finished draw frame sliver (typically 50 – 70 grains/yard).",
    typicalRange: "50 – 70 grains/yd"
  },
  {
    symbol: "Deliveries",
    name: "Heads per Draw Frame",
    unit: "heads",
    description: "Number of active delivery heads (typically 2 on breaker frames, 1 on finisher autolevellers).",
    typicalRange: "1 or 2 deliveries"
  },
  {
    symbol: "1.0936",
    name: "Meter to Yard Constant",
    unit: "yd/m",
    description: "Exact multiplier converting linear meters delivered into yards.",
    typicalRange: "Exact Constant (1.0936)"
  },
  {
    symbol: "7,000",
    name: "Grains per Pound Constant",
    unit: "grains/lb",
    description: "Exact number of grains in one avoirdupois pound.",
    typicalRange: "Exact Constant (7,000)"
  },
  {
    symbol: "Eff %",
    name: "Operational Efficiency",
    unit: "%",
    description: "Net machine operating uptime accounting for can doffing, sliver piecing, and autoleveller stops.",
    typicalRange: "82% – 90%"
  }
];

const workedExample: WorkedExample = {
  title: "Twin-Delivery Draw Frame Production in Grains/Yard",
  scenario:
    "A spinning mill operates a twin-delivery (2 deliveries) draw frame at 450 m/min delivery speed with a delivered sliver weight of 65 grains/yard and 85% operating efficiency over an 8-hour shift.",
  givenInputs: [
    { label: "Delivery Speed", value: "450 m/min" },
    { label: "Sliver Weight", value: "65 grains/yd" },
    { label: "Deliveries", value: "2 Heads" },
    { label: "Efficiency", value: "85%" },
    { label: "Shift Duration", value: "8 Hours" }
  ],
  steps: [
    {
      stepTitle: "Calculate Linear Yards Delivered per Delivery Head",
      formulaStr: "Yards / Head = Speed (m/min) × 60 × 8 × 1.0936",
      calculationStr: "450 × 60 × 8 × 1.0936 = 216,000 × 1.0936",
      resultStr: "236,217.6 yards (100% Eff)"
    },
    {
      stepTitle: "Apply 85% Operating Efficiency",
      formulaStr: "Effective Yards = 236,217.6 × (85 / 100)",
      calculationStr: "236,217.6 × 0.85",
      resultStr: "200,784.96 yards per head"
    },
    {
      stepTitle: "Calculate Total Pounds across Both Deliveries (7,000 gr/lb)",
      formulaStr: "Production (lbs) = (Effective Yards × 65 gr/yd × 2 Heads) / 7,000",
      calculationStr: "(200,784.96 × 65 × 2) / 7,000 = 26,102,044.8 / 7,000",
      resultStr: "3,728.86 lbs / 8-hr shift"
    },
    {
      stepTitle: "Calculate Commercial 100-lb Bags and Metric Kilograms",
      formulaStr: "Bags = lbs / 100 | kg = lbs / 2.20462",
      calculationStr: "3,728.86 / 100 | 3,728.86 / 2.20462",
      resultStr: "37.29 Bags/shift (111.87 bags/day, 1,691.38 kg/shift)"
    }
  ],
  finalResult: "3,728.86 lbs / shift (37.29 bags / 8-hr shift, 1,691.38 kg)"
};

const benchmarks: MillBenchmark[] = [
  {
    title: "Punjab (Faisalabad & Lahore)",
    region: "30s Carded Knitting",
    observation: "Rieter RSB autoleveller frames operate at 600–700 m/min with 60–65 gr/yd sliver, keeping sliver CVm% under 2.4%."
  },
  {
    title: "Coimbatore (India)",
    region: "40s Combed Compact",
    observation: "Finisher draw frames run at 550–650 m/min with 8 doublings. A% variation is kept strictly within ±0.8%."
  },
  {
    title: "Dhaka (Bangladesh)",
    region: "Export Knitwear",
    observation: "LMW LDF3 and Trützschler TD 10 draw frames maintain 88% overall efficiency with automatic can changers."
  }
];

export default function DrawingPage() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-12 min-h-screen">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-4 text-xs font-jetbrains text-on-surface-variant flex items-center gap-2">
        <Link href="/" className="hover:text-primary transition-colors">SpinCalc</Link>
        <span>/</span>
        <span className="text-secondary">Stage 03</span>
        <span>/</span>
        <span className="text-on-surface">Draw Frame</span>
      </nav>

      {/* Page Title & Context */}
      <div className="mb-8">
        <h1 className="headline-lg text-on-surface tracking-tight">
          Draw Frame Production & Delivery Speed Calculator
        </h1>
        <p className="body-md text-on-surface-variant mt-2 max-w-3xl leading-relaxed">
          Calculate draw frame production in lbs/shift, commercial 100-lb bags, delivery speed (m/min), and sliver linear density (grains/yard) using verified textile engineering equations.
        </p>
      </div>

      {/* Interactive Calculator */}
      <DrawingCalculator />

      {/* Crawlable Technical Formulas, Key & Worked Example */}
      <TechnicalNotes
        departmentTitle="Draw Frame Department"
        processDefinition={processDefinition}
        formulas={formulas}
        variables={variables}
        workedExample={workedExample}
        benchmarks={benchmarks}
      />

      {/* Internal Linking & Process Flow Navigation */}
      <SpinningProcessNav currentRoute="/drawing" />
    </div>
  );
}
