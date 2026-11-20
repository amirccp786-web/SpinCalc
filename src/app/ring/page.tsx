import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { RingCalculator } from "./RingCalculator";
import { TechnicalNotes, FormulaItem, VariableDef, WorkedExample, MillBenchmark } from "@/components/TechnicalNotes";
import { SpinningProcessNav } from "@/components/SpinningProcessNav";

export const metadata: Metadata = {
  title: "Ring Frame Production, TPI & Twist Multiplier Calculator",
  description:
    "Calculate ring frame production in g/spindle/8hr shift, OPS, TPI from Twist Multiplier (TM), and bags/shift using verified textile spinning formulas.",
  keywords: [
    "ring frame production calculator",
    "ring spinning g spindle 8hr shift",
    "ounces per spindle OPS formula",
    "TPI calculator textile",
    "twist multiplier calculation ring",
    "yarn count Ne calculation",
    "textile ring frame formulas"
  ],
  alternates: {
    canonical: "https://spincalc.vercel.app/ring",
  },
  openGraph: {
    title: "Ring Frame Production, TPI & Twist Multiplier Calculator | SpinCalc",
    description:
      "Calculate ring frame output in g/spindle/shift, OPS, commercial bags, and TPI using standard textile equations.",
    url: "https://spincalc.vercel.app/ring",
  },
};

const processDefinition =
  "The Ring Spinning frame is the definitive production and quality benchmark of any staple fiber spinning mill. It finalizes the drafting attenuation of the roving strand down to the required nominal yarn count (Ne), inserts the governing helical structural twist via the high-speed traveler and ring flange, and winds the spun yarn onto ring cops. Ring frame production output in commercial 100-lb bags, ounces per spindle (OPS), and grams per spindle (g/sp-shift) determines daily mill profitability and electrical energy utilization (kWh/kg).";

const formulas: FormulaItem[] = [
  {
    name: "Twist Per Inch (TPI) from Twist Multiplier (TM)",
    formula: "TPI = TM × √(Yarn Count Ne)",
    notes: "TM standard values: 3.50–3.80 for hosiery/knitting (soft handle); 4.00–4.40 for weaving warp (high tensile strength)."
  },
  {
    name: "Production (g / spindle / 8-hr Shift)",
    formula: "Production (g/spindle/8hr) = (Spindle RPM × 60 × 8 × 453.6 / (TPI × 36 × 840 × Yarn Count Ne)) × (Eff % / 100)",
    notes: "453.6 converts pounds to grams; 36 converts inches to yards; 840 is the standard English Cotton Count hank constant."
  },
  {
    name: "Ounces Per Spindle (OPS / 8-hr Shift)",
    formula: "OPS = Production (g/spindle/8hr) / 28.3495",
    notes: "Universal productivity metric in Pakistan, India, and Bangladesh spinning mills. 1 avoirdupois ounce equals 28.3495 grams."
  }
];

const variables: VariableDef[] = [
  {
    symbol: "Spindle RPM",
    name: "Ring Spindle Speed",
    unit: "RPM",
    description: "Rotational speed of ring spindles driven by inverter drive pulleys.",
    typicalRange: "16,500 – 21,500 RPM"
  },
  {
    symbol: "Yarn Count (Ne)",
    name: "English Cotton Count",
    unit: "Ne",
    description: "Number of 840-yard hanks that weigh exactly one pound (higher number indicates finer yarn).",
    typicalRange: "10s – 80s Ne"
  },
  {
    symbol: "TM",
    name: "Twist Multiplier",
    unit: "constant",
    description: "Governing twist multiplier determining yarn strength and hand feel.",
    typicalRange: "3.50 – 4.40"
  },
  {
    symbol: "453.6",
    name: "Pound to Gram Conversion Constant",
    unit: "g/lb",
    description: "Exact constant converting standard English avoirdupois pounds to grams.",
    typicalRange: "Exact Constant (453.6)"
  },
  {
    symbol: "840",
    name: "English Cotton Hank Constant",
    unit: "yd/hank",
    description: "Standard length of one cotton yarn hank in yards.",
    typicalRange: "Exact Constant (840)"
  }
];

const workedExample: WorkedExample = {
  title: "1,200-Spindle Ring Frame Running 30s Combed Yarn",
  scenario:
    "A spinning mill in Coimbatore runs a 1,200-spindle ring frame spinning 30s Ne combed cotton yarn at 18,000 RPM, with a Twist Multiplier (TM) of 3.65 and 92% machine efficiency.",
  givenInputs: [
    { label: "Spindle Speed", value: "18,000 RPM" },
    { label: "Yarn Count", value: "30s Ne" },
    { label: "Twist Multiplier (TM)", value: "3.65" },
    { label: "Spindles / Frame", value: "1,200 Spindles" },
    { label: "Efficiency", value: "92%" }
  ],
  steps: [
    {
      stepTitle: "Calculate Twist Per Inch (TPI)",
      formulaStr: "TPI = TM × √(Yarn Count Ne)",
      calculationStr: "3.65 × √(30) = 3.65 × 5.4772",
      resultStr: "19.99 TPI (≈ 20.0 TPI)"
    },
    {
      stepTitle: "Calculate Theoretical Output per Spindle per 8 Hours",
      formulaStr: "Gross g/sp/shift = (RPM × 60 × 8 × 453.6) / (TPI × 36 × 840 × Ne)",
      calculationStr: "(18000 × 480 × 453.6) / (20.0 × 36 × 840 × 30) = 3,919,104,000 / 18,144,000",
      resultStr: "216.00 grams / spindle (100% Eff)"
    },
    {
      stepTitle: "Apply 92% Operating Efficiency & Calculate OPS",
      formulaStr: "Actual g/sp = 216.00 × 0.92 | OPS = Actual g/sp / 28.3495",
      calculationStr: "216.00 × 0.92 = 198.72 g/sp | 198.72 / 28.3495",
      resultStr: "198.72 g/spindle/shift = 7.01 OPS"
    },
    {
      stepTitle: "Calculate Total Frame Production (1,200 Spindles, 8 Hours)",
      formulaStr: "Shift kg = (198.72 × 1200) / 1000 | Bags = (Shift kg × 2.20462) / 100",
      calculationStr: "238.46 kg × 2.20462 / 100",
      resultStr: "238.46 kg = 525.72 lbs = 5.26 Bags / shift (15.77 bags / day)"
    }
  ],
  finalResult: "198.72 g/spindle/shift (7.01 OPS, 5.26 bags / 8-hr shift)"
};

const benchmarks: MillBenchmark[] = [
  {
    title: "Pakistan (Faisalabad & Lahore)",
    region: "30s & 20s Carded/Combed",
    observation: "For 30s combed knit, spindles run 18,500–19,500 RPM with TM 3.65, achieving OPS of 6.9–7.3 oz/spindle."
  },
  {
    title: "India (Coimbatore & Tirupur)",
    region: "30s & 40s Compact Hosiery",
    observation: "Compact spinning frames operate at 20,000–21,500 RPM with lower end breaks (< 8 breaks/1000 sp-hr)."
  },
  {
    title: "Bangladesh (Dhaka & Gazipur)",
    region: "100% Export Knit Mills",
    observation: "Ring frames with 1,600+ spindles average 94% efficiency, ensuring count CV% below 1.2% for circular knitters."
  }
];

export default function RingPage() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-12 min-h-screen">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-4 text-xs font-jetbrains text-on-surface-variant flex items-center gap-2">
        <Link href="/" className="hover:text-primary transition-colors">SpinCalc</Link>
        <span>/</span>
        <span className="text-secondary">Stage 06</span>
        <span>/</span>
        <span className="text-on-surface">Ring Frame</span>
      </nav>

      {/* Page Title & Context */}
      <div className="mb-8">
        <h1 className="headline-lg text-on-surface tracking-tight">
          Ring Frame Production, TPI & Twist Multiplier Calculator
        </h1>
        <p className="body-md text-on-surface-variant mt-2 max-w-3xl leading-relaxed">
          Calculate ring frame production in g/spindle/8hr shift, ounces per spindle (OPS), TPI from Twist Multiplier (TM), and total shift output in commercial 100-lb bags using verified textile spinning formulas.
        </p>
      </div>

      {/* Interactive Calculator */}
      <RingCalculator />

      {/* Crawlable Technical Formulas, Key & Worked Example */}
      <TechnicalNotes
        departmentTitle="Ring Spinning Department"
        processDefinition={processDefinition}
        formulas={formulas}
        variables={variables}
        workedExample={workedExample}
        benchmarks={benchmarks}
      />

      {/* Internal Linking & Process Flow Navigation */}
      <SpinningProcessNav currentRoute="/ring" />
    </div>
  );
}
