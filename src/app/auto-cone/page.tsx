import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { AutoConeCalculator } from "./AutoConeCalculator";
import { TechnicalNotes } from "@/components/TechnicalNotes";
import { SpinningProcessNav } from "@/components/SpinningProcessNav";

export const metadata: Metadata = {
  title: "Auto Cone Winding Production & Drum Efficiency Calculator",
  description:
    "Calculate automatic cone winding production in kg/shift, commercial bags/day, winding speed (m/min), yarn count (Ne), and drum efficiency for spinning mills in Faisalabad, Coimbatore, and Dhaka.",
  keywords: [
    "auto cone calculator",
    "cone winding production calculation",
    "winding speed m min",
    "autoconer efficiency calculation",
    "Murata QPRO winder production",
    "Schlafhorst Autoconer calculator",
    "Savio winding calculation",
    "yarn package weight cones",
    "textile winding formulas"
  ],
  alternates: {
    canonical: "/auto-cone",
  },
  openGraph: {
    title: "Auto Cone Winding Production & Drum Efficiency Calculator | SpinCalc",
    description:
      "Calculate autoconer winding throughput in kg and bags/shift, drum speeds up to 1600 m/min, clearer cut ratios, and package efficiency.",
    url: "https://spincalc.vercel.app/auto-cone",
  },
};

const formulas = [
  {
    name: "Winding Production in kg / 8-hr Shift per Machine",
    formula: "Production (kg/shift) = (Winding Speed (m/min) × 60 × 8 × (Eff% / 100) × Drums) / (Yarn Count Ne × 1,693.3)",
    notes: "Constant 1,693.3 is derived from (840 yd/hank × 0.9144 m/yd × 1,000 g/kg) / 453.592 g/lb."
  },
  {
    name: "Conversion to Commercial 100-lb Bags",
    formula: "Production (lbs/shift) = Production (kg/shift) × 2.20462   ⟹   Bags / Shift = lbs / 100",
    notes: "Multiply by total autoconer machines to verify balance against ring room output."
  },
  {
    name: "Clearer Cut Factor & Net Efficiency",
    formula: "Net Efficiency (%) = Theoretical Speed Efficiency (%) - (Cuts / 100 km × Splicing Downtime Factor)",
    notes: "Electronic yarn clearers (Uster Quantum, Loepfe) extract foreign fibers, thin places, and thick neps."
  },
  {
    name: "Cone Weight & Package Traverse Balance",
    formula: "Total Cones Produced / Shift = Total Production (kg) / Nominal Cone Weight (kg)",
    notes: "Standard commercial cone weight is 1.89 kg (for export knitting) or 2.50 kg (for weaving shuttles)."
  }
];

const variables = [
  {
    symbol: "Winding Speed",
    name: "Linear Drum Winding Speed",
    description: "Linear rate of yarn take-up onto conical paper bobbins driven by grooved traverse drums.",
    typicalRange: "1,100 – 1,500 m/min"
  },
  {
    symbol: "Yarn Count (Ne)",
    name: "English Cotton Count",
    description: "Nominal ring spun yarn count being transferred from cops into knotless packages.",
    typicalRange: "10s – 80s Ne"
  },
  {
    symbol: "Drums / Machine",
    name: "Number of Winding Stations",
    description: "Total automated winding spindles/drums per machine frame.",
    typicalRange: "48 – 72 drums"
  },
  {
    symbol: "Eff %",
    name: "Winder Operational Efficiency",
    description: "Net uptime accounting for cop magazine feeds, suction arm search cycles, and knotter/splicer cycles.",
    typicalRange: "80% – 88%"
  }
];

const benchmarks = [
  {
    title: "Tamil Nadu (Coimbatore & Tirupur)",
    region: "30s Combed Hosiery Cones",
    observation: "Murata QPRO and Savio EcoPulsar winders run at 1,200–1,350 m/min with thermosplicers, achieving 84%–87% shift efficiency with 1.89 kg package sizes."
  },
  {
    title: "Pakistan (Faisalabad & Lahore)",
    region: "20s & 30s Weaving Warp Cones",
    observation: "Schlafhorst AC6 winders run at 1,250–1,400 m/min for warp yarn with wax application rollers for high-speed air-jet looms."
  },
  {
    title: "Bangladesh (Dhaka & Gazipur)",
    region: "Export Quality Knitted Fabrics",
    observation: "Mills maintain stringent clearing channel settings (Uster Classimat matrix) to eliminate all foreign PP (polypropylene) contamination at 1,200 m/min."
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
          Calculate automatic cone winding production in kilograms per shift, commercial 100-lb bags/day, drum winding speed (m/min), yarn count (Ne), and clearer package efficiency.
        </p>
      </div>

      {/* Interactive Calculator */}
      <AutoConeCalculator />

      {/* Crawlable Technical Formulas & Engineering Notes */}
      <TechnicalNotes
        departmentTitle="Auto Cone (Winding) Department"
        formulas={formulas}
        variables={variables}
        benchmarks={benchmarks}
        technicalOverview="The Auto Cone (Automatic Winding) process is the final critical manufacturing stage of the staple fiber spinning mill before conditioning, packing, and dispatch. It rewinds small ring cops (100–150 grams) into knotless, uniform, high-density conical packages (1.89 to 2.50 kg) tailored for high-speed weaving and circular knitting machines. Electronic yarn clearers continuously evaluate optical or capacitive yarn mass variations, snipping out objectionable thick, thin, nep, and foreign fiber faults and rejoining the ends with high-strength air/water splices."
      />

      {/* Internal Linking & Process Flow Navigation */}
      <SpinningProcessNav currentRoute="/auto-cone" />
    </div>
  );
}
