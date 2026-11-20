import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { AutoConeCalculator } from "./AutoConeCalculator";
import { TechnicalNotes, FormulaItem, VariableDef, WorkedExample, MillBenchmark } from "@/components/TechnicalNotes";
import { SpinningProcessNav } from "@/components/SpinningProcessNav";

export const metadata: Metadata = {
  title: "Auto Cone Winding Production & Drum Efficiency Calculator",
  description:
    "Calculate automatic cone winding production in kg/drum/hr, shift output in commercial bags, winding speed (m/min), and yarn count (Ne) using verified textile formulas.",
  keywords: [
    "auto cone calculator",
    "cone winding production kg drum hr",
    "winding speed m min calculation",
    "autoconer efficiency calculation",
    "Murata QPRO winder production",
    "textile cone winding formulas"
  ],
  alternates: {
    canonical: "https://spincalc.vercel.app/auto-cone",
  },
  openGraph: {
    title: "Auto Cone Winding Production & Drum Efficiency Calculator | SpinCalc",
    description:
      "Calculate autoconer winding throughput in kg/drum/hr, machine output in commercial bags, and drum efficiency using verified textile engineering equations.",
    url: "https://spincalc.vercel.app/auto-cone",
  },
};

const processDefinition =
  "The Auto Cone (Automatic Winding) process is the final critical manufacturing stage of the staple fiber spinning mill before conditioning, packing, and dispatch. It rewinds small ring cops (100–150 grams) into knotless, uniform, high-density conical packages (1.89 to 2.50 kg) tailored for high-speed weaving and circular knitting machines. Electronic yarn clearers continuously evaluate optical or capacitive yarn mass variations, snipping out objectionable thick, thin, nep, and foreign fiber faults and rejoining the ends with high-strength air/water splices.";

const formulas: FormulaItem[] = [
  {
    name: "Winding Production (kg / drum / hr)",
    formula: "Production (kg/drum/hr) = (Winding Speed [m/min] × 60 × 0.5905 / (Yarn Count Ne × 1000)) × (Eff % / 100)",
    notes: "Constant 0.5905 converts English Cotton Count (Ne) to metric tex (1 Ne = 590.54 tex = 0.5905 g/m). Dividing by 1000 converts delivered grams to kilograms."
  },
  {
    name: "Total Machine Shift Production (8 Hours)",
    formula: "Shift Output (kg) = kg/drum/hr × Drums per Machine × 8   ⟹   Bags = (Shift kg × 2.20462) / 100",
    notes: "Multiply by total mill winders to ensure clear-room capacity matches ring spinning output."
  },
  {
    name: "Cone Packaging Calculation",
    formula: "Cones Produced / Shift = Shift Output (kg) / Nominal Cone Weight (kg)",
    notes: "Standard package weight is 1.89 kg (knitting packages) or 2.50 kg (weaving warp packages)."
  }
];

const variables: VariableDef[] = [
  {
    symbol: "Winding Speed",
    name: "Drum Take-up Speed",
    unit: "m/min",
    description: "Linear rate of yarn winding onto conical paper bobbins driven by grooved traverse drums.",
    typicalRange: "1,100 – 1,500 m/min"
  },
  {
    symbol: "Yarn Count (Ne)",
    name: "Nominal English Count",
    unit: "Ne",
    description: "Yarn count being cleared and rewound from cops into knotless packages.",
    typicalRange: "10s – 80s Ne"
  },
  {
    symbol: "Drums",
    name: "Drums per Autoconer",
    unit: "drums",
    description: "Total automated winding stations/spindles per machine frame.",
    typicalRange: "48 – 72 drums"
  },
  {
    symbol: "Eff %",
    name: "Operational Efficiency",
    unit: "%",
    description: "Net uptime accounting for bobbin feeding, yarn clearer cut cycles, and automatic doffing.",
    typicalRange: "80% – 88%"
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
  title: "60-Drum Autoconer Running 30s Cotton Yarn",
  scenario:
    "A spinning mill in Dhaka runs a 60-drum Murata QPRO automatic cone winder at 1,200 m/min winding speed processing 30s Ne yarn with 85% operational efficiency.",
  givenInputs: [
    { label: "Winding Speed", value: "1,200 m/min" },
    { label: "Yarn Count", value: "30s Ne" },
    { label: "Drums / Machine", value: "60 Drums" },
    { label: "Efficiency", value: "85%" },
    { label: "Shift Duration", value: "8 Hours" }
  ],
  steps: [
    {
      stepTitle: "Calculate Theoretical Output per Drum per Hour",
      formulaStr: "Gross kg/drum/hr = (Winding Speed × 60 × 0.5905) / (Ne × 1000)",
      calculationStr: "(1200 × 60 × 0.5905) / (30 × 1000) = 42,516 / 30,000",
      resultStr: "1.4172 kg/drum/hr (100% Eff)"
    },
    {
      stepTitle: "Apply 85% Operating Efficiency",
      formulaStr: "Actual kg/drum/hr = 1.4172 × (85 / 100)",
      calculationStr: "1.4172 × 0.85",
      resultStr: "1.2046 kg/drum/hr"
    },
    {
      stepTitle: "Calculate Total Machine Production per Hour (60 Drums)",
      formulaStr: "Machine kg/hr = 1.2046 × 60 Drums",
      calculationStr: "1.2046 × 60",
      resultStr: "72.28 kg/hr per machine"
    },
    {
      stepTitle: "Calculate Machine Shift Production in Commercial 100-lb Bags",
      formulaStr: "Shift kg = 72.28 × 8 = 578.23 kg | Bags = (578.23 × 2.20462) / 100",
      calculationStr: "578.23 × 2.20462 / 100",
      resultStr: "578.23 kg = 1,274.78 lbs = 12.75 Bags / shift (38.24 bags / day)"
    }
  ],
  finalResult: "1.205 kg/drum/hr (72.28 kg/hr machine, 12.75 bags / 8-hr shift)"
};

const benchmarks: MillBenchmark[] = [
  {
    title: "Coimbatore & Tirupur (India)",
    region: "30s Combed Hosiery Cones",
    observation: "Murata QPRO and Savio winders run at 1,200–1,350 m/min with thermosplicers, achieving 84%–87% shift efficiency."
  },
  {
    title: "Faisalabad & Lahore (Pakistan)",
    region: "Weaving Warp Cones",
    observation: "Schlafhorst AC6 winders run at 1,250–1,400 m/min with wax application rollers for high-speed air-jet looms."
  },
  {
    title: "Dhaka & Gazipur (Bangladesh)",
    region: "Export Knit Fabrics",
    observation: "Mills maintain stringent clearing channels to eliminate all foreign PP contamination at 1,200 m/min."
  }
];

export default function AutoConePage() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-12 min-h-screen">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-4 text-xs font-jetbrains text-on-surface-variant flex items-center gap-2">
        <Link href="/" className="hover:text-primary transition-colors">SpinCalc</Link>
        <span>/</span>
        <span className="text-secondary">Stage 07</span>
        <span>/</span>
        <span className="text-on-surface">Auto Cone</span>
      </nav>

      {/* Page Title & Context */}
      <div className="mb-8">
        <h1 className="headline-lg text-on-surface tracking-tight">
          Auto Cone Winding Production & Drum Efficiency Calculator
        </h1>
        <p className="body-md text-on-surface-variant mt-2 max-w-3xl leading-relaxed">
          Calculate automatic cone winding production in kg/drum/hr, total machine output in commercial 100-lb bags, winding speed (m/min), and drum efficiency using verified textile spinning formulas.
        </p>
      </div>

      {/* Interactive Calculator */}
      <AutoConeCalculator />

      {/* Crawlable Technical Formulas, Key & Worked Example */}
      <TechnicalNotes
        departmentTitle="Auto Cone (Winding) Department"
        processDefinition={processDefinition}
        formulas={formulas}
        variables={variables}
        workedExample={workedExample}
        benchmarks={benchmarks}
      />

      {/* Internal Linking & Process Flow Navigation */}
      <SpinningProcessNav currentRoute="/auto-cone" />
    </div>
  );
}
