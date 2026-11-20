import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { CardCalculator } from "./CardCalculator";
import { TechnicalNotes, FormulaItem, VariableDef, WorkedExample, MillBenchmark } from "@/components/TechnicalNotes";
import { SpinningProcessNav } from "@/components/SpinningProcessNav";

export const metadata: Metadata = {
  title: "Carding Machine Production & Total Draft Calculator",
  description:
    "Calculate carding production in kg/hr, delivery speed (m/min), sliver linear density (g/m), and total draft using verified textile spinning formulas.",
  keywords: [
    "carding calculator",
    "carding production kg hr formula",
    "carding total draft calculation",
    "card sliver weight g m",
    "carding delivery speed",
    "textile carding calculations"
  ],
  alternates: {
    canonical: "https://spincalc.vercel.app/card",
  },
  openGraph: {
    title: "Carding Machine Production & Total Draft Calculator | SpinCalc",
    description:
      "Calculate carding machine production in kg/hr, total draft, shift output in bags, and delivery speed using verified textile engineering equations.",
    url: "https://spincalc.vercel.app/card",
  },
};

const processDefinition =
  "Known universally as the 'Heart of the Spinning Mill', the Carding machine individualizes tangled cotton tufts into single fibers, separates micro-neps and residual seed coat fragments, and condenses the cleaned web into a continuous sliver. Precision calculations of delivery speed (m/min), sliver linear density (g/m), and total draft are vital to stabilizing downstream drawing evenness and final yarn tensile strength.";

const formulas: FormulaItem[] = [
  {
    name: "Carding Production Rate (kg/hr)",
    formula: "Production (kg/hr) = (Delivery Speed [m/min] × 60 × Sliver Weight [g/m] / 1000) × (Eff % / 100)",
    notes: "Delivery Speed in m/min multiplied by 60 gives linear meters delivered per hour. Multiplying by sliver weight in g/m gives delivered grams, converted to kg by dividing by 1000."
  },
  {
    name: "Total Mechanical Draft",
    formula: "Total Draft = Feed Lap Weight (g/m) / Delivered Sliver Weight (g/m)",
    notes: "Indicates the degree of fiber strand attenuation between the feed roller and the doffer/calender rollers (typically 80 to 140)."
  },
  {
    name: "Unit Conversion (g/m to grains/yard)",
    formula: "Sliver (grains/yd) = Sliver (g/m) × 14.17   ⟺   Sliver (g/m) = Sliver (grains/yd) / 14.17",
    notes: "Derived from 7000 grains/lb divided by 453.592 g/lb multiplied by 0.9144 m/yd = 14.172 grains per yard per g/m."
  }
];

const variables: VariableDef[] = [
  {
    symbol: "Delivery Speed",
    name: "Doffer Delivery Speed",
    unit: "m/min",
    description: "Surface speed of the doffer and crushing rollers delivering the card web into the sliver trumpet.",
    typicalRange: "120 – 240 m/min"
  },
  {
    symbol: "Sliver Weight",
    name: "Delivered Sliver Mass Density",
    unit: "g/m",
    description: "Weight per unit length of the delivered card sliver (typically 4.0 – 5.5 g/m, corresponding to 55 – 78 grains/yd).",
    typicalRange: "4.0 – 5.5 g/m"
  },
  {
    symbol: "Feed Lap Weight",
    name: "Chute Batt or Lap Weight",
    unit: "g/m",
    description: "Mass per unit length of the infeed batt entering the licker-in roller.",
    typicalRange: "400 – 550 g/m"
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
  title: "High-Speed Card Production & Total Draft",
  scenario:
    "A spinning mill in Coimbatore runs a Trützschler TC carding machine at 160 m/min delivery speed with a delivered sliver weight of 4.80 g/m (~68 grains/yd), infeed chute batt weight of 450 g/m, and 88% operational efficiency.",
  givenInputs: [
    { label: "Delivery Speed", value: "160 m/min" },
    { label: "Sliver Weight", value: "4.80 g/m" },
    { label: "Feed Lap Weight", value: "450 g/m" },
    { label: "Efficiency", value: "88%" }
  ],
  steps: [
    {
      stepTitle: "Calculate Total Mechanical Draft",
      formulaStr: "Total Draft = Feed Lap Weight / Delivered Sliver Weight",
      calculationStr: "450 / 4.80",
      resultStr: "93.75 Draft Ratio"
    },
    {
      stepTitle: "Calculate Theoretical Hourly Production (100% Efficiency)",
      formulaStr: "Theoretical kg/hr = (Delivery Speed × 60 × Sliver Weight) / 1000",
      calculationStr: "(160 × 60 × 4.80) / 1000",
      resultStr: "46.08 kg/hr"
    },
    {
      stepTitle: "Apply 88% Operational Efficiency",
      formulaStr: "Actual kg/hr = 46.08 × (88 / 100)",
      calculationStr: "46.08 × 0.88",
      resultStr: "40.55 kg/hr per machine"
    },
    {
      stepTitle: "Calculate 8-Hour Shift Output in Commercial 100-lb Bags",
      formulaStr: "Shift kg = 40.55 × 8 = 324.40 kg | Bags = (324.40 × 2.20462) / 100",
      calculationStr: "324.40 × 2.20462 / 100",
      resultStr: "324.40 kg = 715.18 lbs = 7.15 Bags / shift"
    }
  ],
  finalResult: "40.55 kg/hr per card (7.15 bags / 8-hr shift, Draft: 93.75)"
};

const benchmarks: MillBenchmark[] = [
  {
    title: "Coimbatore & Tirupur (India)",
    region: "30s & 40s Combed Hosiery",
    observation: "Modern cards run at 160–200 m/min with 4.5–5.0 g/m sliver, keeping nep removal efficiency (NRE) above 90%."
  },
  {
    title: "Faisalabad (Pakistan)",
    region: "20s Carded Weaving",
    observation: "Cards run up to 220–240 m/min with 5.2 g/m sliver for maximum hourly throughput (55–65 kg/hr per card)."
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
          Carding Machine Production & Total Draft Calculator
        </h1>
        <p className="body-md text-on-surface-variant mt-2 max-w-3xl leading-relaxed">
          Calculate carding machine production in kg/hr, shift output in commercial 100-lb bags, delivery speed (m/min), sliver linear density (g/m), and total draft using verified textile equations.
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
