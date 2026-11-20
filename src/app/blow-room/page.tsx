import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { BlowRoomCalculator } from "./BlowRoomCalculator";
import { TechnicalNotes } from "@/components/TechnicalNotes";
import { SpinningProcessNav } from "@/components/SpinningProcessNav";

export const metadata: Metadata = {
  title: "Blow Room Production & Lap Weight Calculator",
  description:
    "Calculate blow room production in kg/hr, bags/shift, scutcher RPM, calender roller diameter, and cleaning waste percentage for textile spinning mills in Faisalabad, Coimbatore, and Dhaka.",
  keywords: [
    "blow room calculator",
    "blow room production kg hr",
    "scutcher production calculation",
    "lap weight calculation",
    "blow room waste percentage",
    "cleaning efficiency formula textile",
    "Faisalabad spinning mills blow room",
    "chute feed production calculation"
  ],
  alternates: {
    canonical: "/blow-room",
  },
  openGraph: {
    title: "Blow Room Production & Lap Weight Calculator | SpinCalc",
    description:
      "Calculate blow room line production in kg/hr, bags/shift, scutcher RPM, and waste percentage for textile spinning mills.",
    url: "https://spincalc.vercel.app/blow-room",
  },
};

const formulas = [
  {
    name: "Production (lbs / 8-hr Shift) — Scutcher RPM Method",
    formula: "Production (lbs/shift) = (π × D × N × Lap Weight × Eff% × (100 - Waste%) × Lines) / 12,000",
    notes: "Where D = Roller Dia in inches, N = Roller RPM, Lap Weight is in oz/yard, and constant 12,000 resolves conversion (36 inches/yd × 16 oz/lb × 10,000 divisor)."
  },
  {
    name: "Production (kg / 8-hr Shift) — Continuous Chute-Feed Method",
    formula: "Production (kg/shift) = Delivery Rate (kg/hr) × 8 × (Efficiency / 100) × Number of Lines",
    notes: "Standard on modern Rieter VARIOline & Trützschler Blowroom feeding continuous card chutes without laps."
  },
  {
    name: "Shift Production in 100-lb Commercial Bags",
    formula: "Bags / Shift = Total Production (lbs / shift) / 100",
    notes: "Standard commercial production unit utilized by mill managers across Pakistan, India, and Bangladesh."
  },
  {
    name: "Cleaning Efficiency Percentage",
    formula: "Cleaning Efficiency (%) = ((Trash% in Bales - Trash% in Card Mat) / Trash% in Bales) × 100",
    notes: "Monitored via Shirley Analyzer or Uster AFIS trash modules to prevent excessive fiber loss."
  }
];

const variables = [
  {
    symbol: "D",
    name: "Bottom Calender Roller Diameter",
    description: "Diameter of the bottom calender roller delivering the compacted fiber lap sheet.",
    typicalRange: "7.0 – 9.0 inches"
  },
  {
    symbol: "N",
    name: "Calender Roller RPM",
    description: "Rotational revolutions per minute of the scutcher calender roller driving lap take-up.",
    typicalRange: "10 – 18 RPM"
  },
  {
    symbol: "Lap Wt",
    name: "Lap Weight per Yard",
    description: "Linear density of the rolled lap sheet measured in ounces per yard.",
    typicalRange: "12 – 16 oz/yd"
  },
  {
    symbol: "Waste %",
    name: "Blow Room Droppings & Invisible Loss",
    description: "Heavy trash, motes, broken seeds, and micro-dust extracted across beating rollers.",
    typicalRange: "3.0% – 5.5%"
  },
  {
    symbol: "Eff %",
    name: "Operational Efficiency",
    description: "Net running time accounting for lap doffing, filter bag cleaning, and magnet inspection.",
    typicalRange: "82% – 90%"
  }
];

const benchmarks = [
  {
    title: "Punjab & Sindh (Pakistan)",
    region: "Faisalabad & Multan",
    observation: "Local cotton (MNH-93, NIAB) carries 6%–9% initial trash. Chute lines run 700–900 kg/hr with 3.8%–4.5% waste target to safeguard yarn realization."
  },
  {
    title: "Gujarat & Tamil Nadu (India)",
    region: "Ahmedabad & Coimbatore",
    observation: "For Shankar-6 and MCU-5 upland cotton, Trützschler blowrooms run at 800–1,100 kg/hr with cleaning efficiency calibrated between 60% and 68%."
  },
  {
    title: "Dhaka & Gazipur (Bangladesh)",
    region: "Imported US & West African Cotton",
    observation: "For 30s combed knit yarn lines, clean machine settings prioritize low nep generation (AFIS nep count < 220 neps/g) at 750–850 kg/hr delivery."
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
          Compute blow room delivery rates in kilograms per hour, shift output in commercial 100-lb bags, scutcher roller RPM, and cleaning waste percentages for modern textile spinning mills.
        </p>
      </div>

      {/* Interactive Calculator */}
      <BlowRoomCalculator />

      {/* Crawlable Technical Formulas & Engineering Notes */}
      <TechnicalNotes
        departmentTitle="Blow Room Department"
        formulas={formulas}
        variables={variables}
        benchmarks={benchmarks}
        technicalOverview="The Blow Room constitutes the primary mechanical opening, blending, and cleaning stage in staple fiber yarn spinning. Raw cotton from compressed bales is opened into tiny tufts, purged of heavy vegetable impurities, seed coat fragments, and dust, and formed into either a calibrated lap or pneumatically transported through chute feeds directly to the carding machines. Accurate mathematical calculations of scutcher calender speed, lap linear weight, and line efficiency ensure uniform mass distribution and balanced production flow across downstream carding lines."
      />

      {/* Internal Linking & Process Flow Navigation */}
      <SpinningProcessNav currentRoute="/blow-room" />
    </div>
  );
}
