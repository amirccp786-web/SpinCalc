import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { DrawingCalculator } from "./DrawingCalculator";
import { TechnicalNotes, FormulaItem, VariableDef, WorkedExample, MillBenchmark } from "@/components/TechnicalNotes";
import { SpinningProcessNav } from "@/components/SpinningProcessNav";

export const metadata: Metadata = {
  title: "Draw Frame Production & Actual Draft Calculator",
  description:
    "Calculate draw frame production in kg/hr/delivery, actual draft, delivery speed (m/min), and sliver weight (g/m) using verified textile spinning equations.",
  keywords: [
    "draw frame calculator",
    "draw frame production kg hr delivery",
    "draw frame actual draft formula",
    "sliver doubling calculation",
    "autoleveller draw frame calculations",
    "textile drawing calculations"
  ],
  alternates: {
    canonical: "https://spincalc.vercel.app/drawing",
  },
  openGraph: {
    title: "Draw Frame Production & Actual Draft Calculator | SpinCalc",
    description:
      "Calculate draw frame delivery rate in kg/hr/del, actual draft, and shift output in bags using verified textile engineering formulas.",
    url: "https://spincalc.vercel.app/drawing",
  },
};

const processDefinition =
  "The Draw Frame performs fiber parallelization through roller drafting and mass homogenization through doubling (feeding 6 to 8 slivers simultaneously). High-speed autoleveller draw frames continuously scan entering mass variations and adjust dynamic drafting ratios within milliseconds. Calculating delivery speed (m/min), sliver linear density (g/m), and actual draft is critical to suppressing short-term drafting waves and achieving low yarn count CV%.";

const formulas: FormulaItem[] = [
  {
    name: "Draw Frame Production per Delivery Head (kg/hr/del)",
    formula: "Production (kg/hr/del) = (Delivery Speed [m/min] × 60 × Sliver Weight [g/m] / 1000) × (Eff % / 100)",
    notes: "Multiply by the number of deliveries per machine (1 for finisher autoleveller, 2 for breaker frame) and total machines to find mill room output."
  },
  {
    name: "Actual Draft Calculation",
    formula: "Actual Draft = (Feed Sliver Weight [g/m] × Doublings) / Delivered Sliver Weight [g/m]",
    notes: "Accounts for the total combined mass fed into the drafting zone divided by the final delivered sliver linear density."
  },
  {
    name: "Unit Conversion (g/m to grains/yard)",
    formula: "Sliver (grains/yd) = Sliver (g/m) × 14.17   ⟺   Sliver (g/m) = Sliver (grains/yd) / 14.17",
    notes: "Standard draw frame sliver of 4.20 g/m corresponds to ~59.5 grains/yard."
  }
];

const variables: VariableDef[] = [
  {
    symbol: "Delivery Speed",
    name: "Calender Delivery Speed",
    unit: "m/min",
    description: "Linear rate of delivered sliver passing into the rotary coiler head.",
    typicalRange: "400 – 850 m/min"
  },
  {
    symbol: "Sliver Weight",
    name: "Delivered Sliver Weight",
    unit: "g/m",
    description: "Linear density of the finished sliver fed to the speed frame / comber lap former.",
    typicalRange: "3.5 – 5.0 g/m (50 – 70 gr/yd)"
  },
  {
    symbol: "Feed Sliver",
    name: "Infeed Sliver Linear Weight",
    unit: "g/m",
    description: "Weight of each carded or combed sliver fed into the creel.",
    typicalRange: "4.0 – 5.5 g/m"
  },
  {
    symbol: "Doublings",
    name: "Number of Feed Ends",
    unit: "ends",
    description: "Number of cans combined in parallel into the drafting zone to equalize mass variation.",
    typicalRange: "6 or 8 ends"
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
  title: "Twin-Delivery Breaker Draw Frame Output & Draft",
  scenario:
    "A spinning mill in Lahore operates a twin-delivery draw frame at 500 m/min delivery speed with a delivered sliver weight of 4.20 g/m, feeding 8 cans of 4.50 g/m sliver at 85% operating efficiency.",
  givenInputs: [
    { label: "Delivery Speed", value: "500 m/min" },
    { label: "Delivered Sliver", value: "4.20 g/m" },
    { label: "Feed Sliver", value: "4.50 g/m" },
    { label: "Doublings", value: "8 Ends" },
    { label: "Deliveries", value: "2 Heads" },
    { label: "Efficiency", value: "85%" }
  ],
  steps: [
    {
      stepTitle: "Calculate Actual Draft",
      formulaStr: "Actual Draft = (Feed Sliver × Doublings) / Delivered Sliver",
      calculationStr: "(4.50 × 8) / 4.20 = 36.00 / 4.20",
      resultStr: "8.57 Draft Ratio"
    },
    {
      stepTitle: "Calculate Hourly Production per Delivery Head",
      formulaStr: "kg/hr/del = (Delivery Speed × 60 × Sliver Weight / 1000) × (Eff / 100)",
      calculationStr: "(500 × 60 × 4.20 / 1000) × 0.85 = 126.00 × 0.85",
      resultStr: "107.10 kg/hr/delivery"
    },
    {
      stepTitle: "Calculate Total Machine Shift Production (2 Heads, 8 Hours)",
      formulaStr: "Total Shift kg = 107.10 × 2 Heads × 8 Hours | Bags = (Shift kg × 2.20462) / 100",
      calculationStr: "214.20 kg/hr × 8 = 1,713.60 kg × 2.20462 / 100",
      resultStr: "1,713.60 kg = 3,777.84 lbs = 37.78 Bags / shift"
    }
  ],
  finalResult: "107.10 kg/hr/delivery (214.20 kg/hr total, 37.78 bags / shift, Draft: 8.57)"
};

const benchmarks: MillBenchmark[] = [
  {
    title: "Punjab (Faisalabad & Lahore)",
    region: "30s Carded Knitting",
    observation: "Rieter RSB autoleveller frames operate at 600–700 m/min with 4.0–4.4 g/m sliver, keeping sliver CVm% under 2.4%."
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
          Draw Frame Production & Actual Draft Calculator
        </h1>
        <p className="body-md text-on-surface-variant mt-2 max-w-3xl leading-relaxed">
          Calculate draw frame production in kg/hr/delivery, total machine shift output in commercial 100-lb bags, actual draft, and delivery speed using verified textile engineering equations.
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
