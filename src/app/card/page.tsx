import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { CardCalculator } from "./CardCalculator";
import { TechnicalNotes } from "@/components/TechnicalNotes";
import { SpinningProcessNav } from "@/components/SpinningProcessNav";

export const metadata: Metadata = {
  title: "Carding Machine Production & Sliver Hank Calculator",
  description:
    "Calculate carding production in kg/hr, lbs/shift, delivery speed (m/min), sliver hank (grains/yd), and waste percentage for textile spinning mills in Coimbatore, Faisalabad, and Dhaka.",
  keywords: [
    "carding calculator",
    "carding production kg hr",
    "carding machine delivery speed",
    "sliver weight grains per yard",
    "card sliver hank Ne",
    "carding draft calculation",
    "Rieter card production",
    "Truetzschler carding calculator",
    "textile carding formulas"
  ],
  alternates: {
    canonical: "/card",
  },
  openGraph: {
    title: "Carding Machine Production & Sliver Hank Calculator | SpinCalc",
    description:
      "Calculate carding delivery speeds, sliver weights in grains/yd, shift production in bags, and draft efficiency for spinning mills.",
    url: "https://spincalc.vercel.app/card",
  },
};

const formulas = [
  {
    name: "Card Production in lbs / 8-hr Shift",
    formula: "Production (lbs/shift) = (Delivery Speed (m/min) × 1.0936 × 60 × 8 × (Eff% / 100) × Sliver Grains/yd) / 7,000",
    notes: "Derived from linear delivery where 1 meter = 1.0936 yards and 7,000 grains = 1 avoirdupois pound."
  },
  {
    name: "Card Production in Kilograms per Hour (kg/hr)",
    formula: "Production (kg/hr) = (Delivery Speed (m/min) × 60 × Sliver Weight (ktex or g/m) × Eff%) / 100,000",
    notes: "Metric formula widely used with modern sliver autolevellers calibrated in ktex (grams per meter)."
  },
  {
    name: "Sliver Hank Conversion (Ne from grains/yd)",
    formula: "Sliver Hank (Ne) = 8.33 / Sliver Weight (grains/yard)",
    notes: "For example, 70 grains/yard corresponds to 8.33 / 70 = 0.119 Ne sliver."
  },
  {
    name: "Total Carding Draft",
    formula: "Total Draft = Feed Lap Weight (grains/yd) / Delivered Sliver Weight (grains/yd)",
    notes: "Typical total mechanical draft on modern cards ranges from 80 to 140."
  }
];

const variables = [
  {
    symbol: "Delivery Speed",
    name: "Doffer / Calender Linear Speed",
    description: "Linear rate of sliver delivery emerging through the coiler into the sliver can.",
    typicalRange: "140 – 260 m/min"
  },
  {
    symbol: "Sliver Weight",
    name: "Delivered Sliver Mass per Unit Length",
    description: "Measured in grains per yard (gr/yd) or metric ktex (g/m). Target determines breaker draw frame draft.",
    typicalRange: "55 – 75 grains/yd (3.6 – 5.0 ktex)"
  },
  {
    symbol: "Eff %",
    name: "Carding Machine Efficiency",
    description: "Operational uptime accounting for can changes, cylinder grinding, flat stripping, and web breaks.",
    typicalRange: "85% – 93%"
  },
  {
    symbol: "Waste %",
    name: "Licker-in & Flat Strips Extraction",
    description: "Short fiber, neps, and trash removed by stationary flats, revolving flats, and under-casing.",
    typicalRange: "4.5% – 7.5%"
  }
];

const benchmarks = [
  {
    title: "Tamil Nadu (Coimbatore & Tirupur)",
    region: "30s & 40s Combed Hosiery",
    observation: "Rieter C70 / Trützschler TC15 cards run at 170–210 m/min delivering 60–65 gr/yd sliver. Target nep removal efficiency (NRE) exceeds 88%–92%."
  },
  {
    title: "Punjab (Faisalabad & Sheikhupura)",
    region: "20s & 16s Carded Weaving Yarn",
    observation: "Card speeds reach 220–250 m/min with 70–75 gr/yd sliver (production 85–110 kg/hr/card) using Shankar-6 or local Afzal cotton."
  },
  {
    title: "Dhaka & Gazipur (Bangladesh)",
    region: "Export Quality Combed Knit",
    observation: "Mills focus on low CVm% (< 2.8%) at 180 m/min delivery speed to maintain strict Uster 5% statistics on final combed cones."
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
          Carding Machine Production & Sliver Hank Calculator
        </h1>
        <p className="body-md text-on-surface-variant mt-2 max-w-3xl leading-relaxed">
          Calculate carding production rates in kilograms per hour, shift output in commercial 100-lb bags, delivery speed (m/min), sliver hank (grains/yd), and draft efficiency for spinning mills.
        </p>
      </div>

      {/* Interactive Calculator */}
      <CardCalculator />

      {/* Crawlable Technical Formulas & Engineering Notes */}
      <TechnicalNotes
        departmentTitle="Carding Department"
        formulas={formulas}
        variables={variables}
        benchmarks={benchmarks}
        technicalOverview="Referred to universally as the 'Heart of the Spinning Mill', the Carding machine individualizes tangled fiber tufts into single fibers, eliminates persistent seed-coat fragments and micro-dust, disentangles neps, and condenses the cleaned web into a continuous sliver. Sliver linear density (grains/yard or ktex), delivery speed (m/min), and waste extraction through revolving flat strips directly dictate downstream drawing performance, roving evenness, and yarn tensile strength."
      />

      {/* Internal Linking & Process Flow Navigation */}
      <SpinningProcessNav currentRoute="/card" />
    </div>
  );
}
