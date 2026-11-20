import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { AutoConeCalculator } from "./AutoConeCalculator";
import { TechnicalNotes, FormulaItem, VariableDef, WorkedExample, MillBenchmark } from "@/components/TechnicalNotes";
import { SpinningProcessNav } from "@/components/SpinningProcessNav";

export const metadata: Metadata = {
  title: "Auto Cone Winding Production & Drum Efficiency Calculator",
  description:
    "Calculate automatic cone winding production in lbs/shift, commercial bags, winding speed (m/min), and yarn count (Ne) using verified textile formulas.",
  keywords: [
    "auto cone calculator",
    "cone winding production lbs shift formula",
    "winding speed m min",
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
      "Calculate autoconer winding throughput in lbs/shift, commercial bags, and drum efficiency using verified textile engineering equations.",
    url: "https://spincalc.vercel.app/auto-cone",
  },
};

const processDefinition =
  "The Auto Cone (Automatic Winding) process is the final critical manufacturing stage of the staple fiber spinning mill before conditioning, packing, and dispatch. It rewinds small ring cops (100–150 grams) into knotless, uniform, high-density conical packages (1.89 to 2.50 kg) tailored for high-speed weaving and circular knitting machines. Electronic yarn clearers continuously evaluate optical or capacitive yarn mass variations, snipping out objectionable thick, thin, nep, and foreign fiber faults and rejoining the ends with high-strength air/water splices.";

const formulas: FormulaItem[] = [
  {
    name: "Winding Production (lbs / 8-hr Shift)",
    formula: "Production (lbs/shift) = (Winding Speed [m/min] × 1.0936 × 60 × 8 × (Eff % / 100) × Drums) / (840 × Yarn Count Ne)",
    notes: "Multiplying speed (m/min) by 1.0936 converts meters to yards. Multiplying by 60 and 8 gives total yards per shift. Dividing by 840 × Ne converts total yards into pounds."
  },
  {
    name: "Conversion to Commercial 100-lb Bags and Kilograms",
    formula: "Bags / Shift = Production (lbs/shift) / 100   ⟹   Production (kg/shift) = Production (lbs/shift) / 2.20462",
    notes: "Multiply by total mill winders to ensure clear-room capacity matches ring spinning room output."
  },
  {
    name: "Cone Packaging Output",
    formula: "Cones Produced / Shift = Production (kg/shift) / Nominal Cone Weight (kg)",
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
    symbol: "1.0936",
    name: "Meter to Yard Conversion Constant",
    unit: "yd/m",
    description: "Exact multiplier converting linear meters delivered into yards (since 1 meter = 1.09361 yards).",
    typicalRange: "Exact Constant (1.0936)"
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
    symbol: "840",
    name: "English Cotton Hank Constant",
    unit: "yd/hank",
    description: "Standard yards per hank in the English cotton count system.",
    typicalRange: "Exact Constant (840)"
  },
  {
    symbol: "Eff %",
    name: "Operational Efficiency",
    unit: "%",
    description: "Net uptime accounting for bobbin feeding, yarn clearer cut cycles, and automatic doffing.",
    typicalRange: "80% – 88%"
  }
];

const workedExample: WorkedExample = {
  title: "60-Drum Autoconer Running 30s Cotton Yarn",
  scenario:
    "A spinning mill runs a 60-drum automatic cone winder at 1,200 m/min winding speed processing 30s Ne yarn with 85% operational efficiency over an 8-hour shift.",
  givenInputs: [
    { label: "Winding Speed", value: "1,200 m/min" },
    { label: "Meter-to-Yard Factor", value: "1.0936 yd/m" },
    { label: "Yarn Count", value: "30s Ne" },
    { label: "Drums / Machine", value: "60 Drums" },
    { label: "Efficiency", value: "85%" },
    { label: "Shift Duration", value: "8 Hours" }
  ],
  steps: [
    {
      stepTitle: "Calculate Total Linear Yards Wound per Shift (Multiplying by 1.0936)",
      formulaStr: "Total Yards = Speed (m/min) × 1.0936 × 60 × 8 × (Eff / 100) × Drums",
      calculationStr: "1200 × 1.0936 × 60 × 8 × 0.85 × 60 = 1200 × 1.0936 × 480 × 51",
      resultStr: "32,165,145.60 yards delivered"
    },
    {
      stepTitle: "Convert Yards to Pounds using Count Constant (840 × Ne)",
      formulaStr: "Production (lbs/shift) = Total Yards / (840 × Yarn Count Ne)",
      calculationStr: "32,165,145.60 / (840 × 30) = 32,165,145.60 / 25,200",
      resultStr: "1,276.39 lbs / shift"
    },
    {
      stepTitle: "Calculate Commercial 100-lb Bags and Metric Kilograms",
      formulaStr: "Bags = lbs / 100 | kg = lbs / 2.20462",
      calculationStr: "1,276.39 / 100 | 1,276.39 / 2.20462",
      resultStr: "12.76 Bags / shift (38.29 bags / day, 578.96 kg / shift)"
    }
  ],
  finalResult: "1,276.39 lbs / shift (12.76 bags / 8-hr shift, 578.96 kg)"
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
          Calculate automatic cone winding production in lbs/shift, commercial 100-lb bags, winding speed (m/min), and drum efficiency using verified textile spinning formulas.
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
