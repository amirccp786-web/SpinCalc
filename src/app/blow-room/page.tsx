import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { BlowRoomCalculator } from "./BlowRoomCalculator";
import { TechnicalNotes, FormulaItem, VariableDef, WorkedExample, MillBenchmark } from "@/components/TechnicalNotes";
import { SpinningProcessNav } from "@/components/SpinningProcessNav";

export const metadata: Metadata = {
  title: "Blow Room Production & Lap Weight Calculator",
  description:
    "Calculate blow room production in kg/hr, bags/shift, calender speed (m/min), and lap weight (g/m) using verified standard textile spinning mathematical formulas.",
  keywords: [
    "blow room calculator",
    "blow room production kg hr formula",
    "calender speed m min",
    "lap weight g m",
    "blow room calculations textile",
    "scutcher production calculation"
  ],
  alternates: {
    canonical: "https://spincalc.vercel.app/blow-room",
  },
  openGraph: {
    title: "Blow Room Production & Lap Weight Calculator | SpinCalc",
    description:
      "Calculate blow room production in kg/hr, shift output in bags, calender speed, and lap linear density using verified textile engineering equations.",
    url: "https://spincalc.vercel.app/blow-room",
  },
};

const processDefinition =
  "The Blow Room is the foundational opening and cleaning stage in staple fiber spinning. Compressed raw cotton bales are plucked, opened into tiny fiber tufts, blended to homogenize micronaire, and purged of heavy seeds, sand, and plant trash. Accurately computing calender delivery speed (m/min) and lap weight (g/m) ensures balanced mass throughput that neither starves nor chokes downstream carding lines.";

const formulas: FormulaItem[] = [
  {
    name: "Standard Blow Room Production (kg/hr)",
    formula: "Production (kg/hr) = (Calender Speed [m/min] × 60 × Lap Weight [g/m] / 1000) × (Eff % / 100)",
    notes: "Calender Speed in m/min multiplied by 60 gives meters per hour. Multiplying by lap weight (g/m) and dividing by 1000 yields gross kilograms per hour."
  },
  {
    name: "Shift Production (kg and Commercial 100-lb Bags)",
    formula: "Shift Output (kg/8-hr) = Production (kg/hr) × 8   ⟹   Bags/shift = (Shift kg × 2.20462) / 100",
    notes: "1 commercial textile bag equals 100 avoirdupois pounds (45.3592 kg). 24-hr daily production equals shift output multiplied by 3."
  },
  {
    name: "Lap Weight Unit Conversion (oz/yd to g/m)",
    formula: "Lap Weight (g/m) = Lap Weight (oz/yd) × 31.003",
    notes: "Derived from (28.3495 grams/oz) / (0.9144 meters/yard) = 31.0034 g/m per oz/yd."
  }
];

const variables: VariableDef[] = [
  {
    symbol: "Calender Speed",
    name: "Calender Delivery Speed",
    unit: "m/min",
    description: "Linear surface speed of the scutcher calender rollers that compress and deliver the fiber sheet.",
    typicalRange: "10.0 – 16.0 m/min"
  },
  {
    symbol: "Lap Weight",
    name: "Linear Mass Density of Lap",
    unit: "g/m",
    description: "Weight per unit length of the delivered fiber sheet (typically 400 – 500 g/m, corresponding to 13 – 16 oz/yd).",
    typicalRange: "400 – 500 g/m"
  },
  {
    symbol: "Eff %",
    name: "Operational Efficiency",
    unit: "%",
    description: "Net operating efficiency of the blow room line after deducting lap doffing and filter cleaning cycles.",
    typicalRange: "80% – 90%"
  },
  {
    symbol: "1000",
    name: "Metric Mass Conversion Constant",
    unit: "g/kg",
    description: "Divisor converting delivered grams of fiber into standard kilograms.",
    typicalRange: "Exact Constant (1000)"
  }
];

const workedExample: WorkedExample = {
  title: "Rieter Blow Room Scutcher Line Production",
  scenario:
    "A spinning mill in Faisalabad operates a blow room line producing a 450 g/m cotton lap sheet at a calender speed of 12.0 m/min with an operational efficiency of 85%.",
  givenInputs: [
    { label: "Calender Speed", value: "12.0 m/min" },
    { label: "Lap Weight", value: "450 g/m" },
    { label: "Efficiency", value: "85%" },
    { label: "Shift Duration", value: "8 Hours" }
  ],
  steps: [
    {
      stepTitle: "Calculate Theoretical Hourly Production (100% Efficiency)",
      formulaStr: "Theoretical kg/hr = (Calender Speed × 60 × Lap Weight) / 1000",
      calculationStr: "(12.0 × 60 × 450) / 1000",
      resultStr: "324.00 kg/hr"
    },
    {
      stepTitle: "Apply Operating Efficiency (85%)",
      formulaStr: "Actual kg/hr = Theoretical kg/hr × (85 / 100)",
      calculationStr: "324.00 × 0.85",
      resultStr: "275.40 kg/hr"
    },
    {
      stepTitle: "Calculate 8-Hour Shift Output in Kilograms and Commercial 100-lb Bags",
      formulaStr: "Shift kg = 275.40 × 8 | Bags = (Shift kg × 2.20462) / 100",
      calculationStr: "2,203.20 kg × 2.20462 / 100",
      resultStr: "2,203.20 kg = 4,857.22 lbs = 48.57 Bags / shift"
    }
  ],
  finalResult: "275.40 kg/hr (48.57 bags / 8-hr shift)"
};

const benchmarks: MillBenchmark[] = [
  {
    title: "Punjab (Faisalabad & Multan)",
    region: "Local Medium Staple",
    observation: "Chute feeds and lap formers operate at 250–320 kg/hr per line with 3.8%–4.5% cleaning waste target."
  },
  {
    title: "Gujarat & Tamil Nadu (India)",
    region: "Shankar-6 & MCU-5",
    observation: "Modern blowrooms maintain 750–1,000 kg/hr continuous chute output feeding 10–12 cards directly."
  },
  {
    title: "Dhaka & Gazipur (Bangladesh)",
    region: "100% Cotton Knitwear",
    observation: "Blow rooms running combed cotton maintain low beater speeds to preserve fiber length (SFC < 7.5%)."
  }
];

export default function BlowRoomPage() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-12 min-h-screen">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-4 text-xs font-jetbrains text-on-surface-variant flex items-center gap-2">
        <Link href="/" className="hover:text-primary transition-colors">SpinCalc</Link>
        <span>/</span>
        <span className="text-secondary">Stage 01</span>
        <span>/</span>
        <span className="text-on-surface">Blow Room</span>
      </nav>

      {/* Page Title & Context */}
      <div className="mb-8">
        <h1 className="headline-lg text-on-surface tracking-tight">
          Blow Room Production & Lap Weight Calculator
        </h1>
        <p className="body-md text-on-surface-variant mt-2 max-w-3xl leading-relaxed">
          Calculate blow room production in kg/hr, shift output in commercial 100-lb bags, calender delivery speed, and lap linear weight using standard textile engineering equations.
        </p>
      </div>

      {/* Interactive Calculator */}
      <BlowRoomCalculator />

      {/* Crawlable Technical Formulas, Key & Worked Example */}
      <TechnicalNotes
        departmentTitle="Blow Room Department"
        processDefinition={processDefinition}
        formulas={formulas}
        variables={variables}
        workedExample={workedExample}
        benchmarks={benchmarks}
      />

      {/* Internal Linking & Process Flow Navigation */}
      <SpinningProcessNav currentRoute="/blow-room" />
    </div>
  );
}
