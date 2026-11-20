import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { CardCalculator } from "./CardCalculator";
import { TechnicalNotes, FormulaItem, VariableDef, WorkedExample, MillBenchmark } from "@/components/TechnicalNotes";
import { SpinningProcessNav } from "@/components/SpinningProcessNav";

export const metadata: Metadata = {
  title: "Carding Machine Production & Sliver Weight Calculator",
  description:
    "Calculate carding production in lbs/shift, commercial 100-lb bags, delivery speed (m/min), and sliver weight (grains/yd) using standard textile spinning formulas.",
  keywords: [
    "carding calculator",
    "carding production lbs shift formula",
    "card sliver weight grains yard",
    "carding delivery speed m min",
    "textile carding calculations",
    "carding production in bags"
  ],
  alternates: {
    canonical: "https://spincalc.vercel.app/card",
  },
  openGraph: {
    title: "Carding Machine Production & Sliver Weight Calculator | SpinCalc",
    description:
      "Calculate carding machine production in lbs/shift, commercial bags, delivery speed, and sliver weight in grains/yard.",
    url: "https://spincalc.vercel.app/card",
  },
};

const processDefinition =
  "Known universally as the 'Heart of the Spinning Mill', the Carding machine individualizes tangled cotton tufts into single fibers, separates micro-neps and residual seed coat fragments, and condenses the cleaned web into a continuous sliver. Precision calculations of delivery speed (m/min), sliver linear density (grains/yard), and machine efficiency are vital to stabilizing downstream drawing evenness and final yarn tensile strength.";

const formulas: FormulaItem[] = [
  {
    name: "Carding Shift Production (lbs / 8-hr Shift)",
    formula: "Production (lbs/shift) = (Delivery Speed [m/min] × 60 × 8 × (Eff % / 100) × Sliver [grains/yd] × 1.0936) / 7,000",
    notes: "1 meter equals 1.0936 yards. 7,000 grains equal 1 avoirdupois pound. Divide lbs by 100 to get commercial 100-lb bags."
  },
  {
    name: "Carding Daily Production (24 Hours)",
    formula: "Daily Output = Shift Production (lbs / 8-hr) × 3   ⟹   Daily Bags = Daily lbs / 100",
    notes: "3 continuous 8-hour operational shifts per 24-hour day in spinning mills."
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
    name: "Doffer Delivery Speed",
    unit: "m/min",
    description: "Linear throughput surface speed of the doffer and crushing rollers delivering the web into the coiler.",
    typicalRange: "120 – 240 m/min"
  },
  {
    symbol: "Sliver Weight",
    name: "Delivered Sliver Mass Density",
    unit: "grains/yd",
    description: "Weight per unit length of the delivered card sliver (typically 60 – 75 grains/yd, where 70 grains/yd = 4.94 g/m).",
    typicalRange: "60 – 75 grains/yd"
  },
  {
    symbol: "1.0936",
    name: "Meter to Yard Conversion Constant",
    unit: "yd/m",
    description: "Exact multiplier converting linear meters delivered into yards.",
    typicalRange: "Exact Constant (1.0936)"
  },
  {
    symbol: "7,000",
    name: "Grains to Pound Constant",
    unit: "grains/lb",
    description: "Exact number of grains in one avoirdupois pound.",
    typicalRange: "Exact Constant (7,000)"
  },
  {
    symbol: "Eff %",
    name: "Machine Operating Efficiency",
    unit: "%",
    description: "Operational uptime accounting for can doffing, flat stripping, cylinder maintenance, and web breakage.",
    typicalRange: "85% – 93%"
  }
];

const workedExample: WorkedExample = {
  title: "Standard Mill Card Production in Grains/Yard",
  scenario:
    "A spinning mill runs a carding machine at 150 m/min delivery speed with a delivered sliver weight of 70 grains/yard and 85% operational efficiency over an 8-hour shift.",
  givenInputs: [
    { label: "Delivery Speed", value: "150 m/min" },
    { label: "Sliver Weight", value: "70 grains/yd" },
    { label: "Efficiency", value: "85%" },
    { label: "Shift Duration", value: "8 Hours" }
  ],
  steps: [
    {
      stepTitle: "Calculate Total Linear Yards Delivered per Shift",
      formulaStr: "Delivered Yards = Speed (m/min) × 60 × 8 × 1.0936",
      calculationStr: "150 × 60 × 8 × 1.0936 = 7200 × 1.0936",
      resultStr: "787,392 yards (100% Eff)"
    },
    {
      stepTitle: "Apply 85% Machine Operating Efficiency",
      formulaStr: "Effective Yards = 787,392 × (85 / 100)",
      calculationStr: "787,392 × 0.85",
      resultStr: "669,283.2 yards"
    },
    {
      stepTitle: "Calculate Total Weight in Grains and Convert to Pounds (7,000 gr/lb)",
      formulaStr: "Production (lbs) = (Effective Yards × 70 grains/yd) / 7,000",
      calculationStr: "(669,283.2 × 70) / 7,000 = 46,849,824 / 7,000",
      resultStr: "6,692.83 lbs / 8-hr shift"
    },
    {
      stepTitle: "Calculate Commercial 100-lb Bags and Metric Kilograms",
      formulaStr: "Bags = lbs / 100 | kg = lbs / 2.20462",
      calculationStr: "6,692.83 / 100 | 6,692.83 / 2.20462",
      resultStr: "66.93 Bags/shift (200.78 bags/day, 3,035.82 kg/shift)"
    }
  ],
  finalResult: "6,692.83 lbs / shift (66.93 bags / 8-hr shift, 3,035.82 kg)"
};

const benchmarks: MillBenchmark[] = [
  {
    title: "Coimbatore & Tirupur (India)",
    region: "30s & 40s Combed Hosiery",
    observation: "Modern cards run at 160–200 m/min with 60–65 gr/yd sliver, keeping nep removal efficiency (NRE) above 90%."
  },
  {
    title: "Faisalabad (Pakistan)",
    region: "20s Carded Weaving",
    observation: "Cards run up to 220–240 m/min with 70–75 gr/yd sliver for maximum hourly throughput (55–65 kg/hr per card)."
  },
  {
    title: "Gazipur (Bangladesh)",
    region: "Export Knit Mills",
    observation: "Sliver CVm% is maintained strictly below 2.8% to guarantee high circular knitting yarn efficiency."
  }
];

export default function CardPage() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-12 min-h-screen">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-4 text-xs font-jetbrains text-on-surface-variant flex items-center gap-2">
        <Link href="/" className="hover:text-primary transition-colors">SpinCalc</Link>
        <span>/</span>
        <span className="text-secondary">Stage 02</span>
        <span>/</span>
        <span className="text-on-surface">Carding</span>
      </nav>

      {/* Page Title & Context */}
      <div className="mb-8">
        <h1 className="headline-lg text-on-surface tracking-tight">
          Carding Machine Production & Sliver Weight Calculator
        </h1>
        <p className="body-md text-on-surface-variant mt-2 max-w-3xl leading-relaxed">
          Calculate carding production in lbs/shift, commercial 100-lb bags, delivery speed (m/min), and sliver linear density (grains/yard) using verified textile spinning equations.
        </p>
      </div>

      {/* Interactive Calculator */}
      <CardCalculator />

      {/* Crawlable Technical Formulas, Key & Worked Example */}
      <TechnicalNotes
        departmentTitle="Carding Department"
        processDefinition={processDefinition}
        formulas={formulas}
        variables={variables}
        workedExample={workedExample}
        benchmarks={benchmarks}
      />

      {/* Internal Linking & Process Flow Navigation */}
      <SpinningProcessNav currentRoute="/card" />
    </div>
  );
}
