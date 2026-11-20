import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { DrawingCalculator } from "./DrawingCalculator";
import { TechnicalNotes } from "@/components/TechnicalNotes";
import { SpinningProcessNav } from "@/components/SpinningProcessNav";

export const metadata: Metadata = {
  title: "Draw Frame Production & Delivery Speed Calculator",
  description:
    "Calculate draw frame production in lbs/shift, bags/day, delivery speed (m/min), sliver hank (gr/yd), and autoleveller efficiency for spinning mills in Faisalabad, Coimbatore, and Dhaka.",
  keywords: [
    "draw frame calculator",
    "draw frame production calculation",
    "draw frame delivery speed m min",
    "breaker draw frame calculation",
    "finisher draw frame autoleveller",
    "sliver doubling calculation",
    "sliver count CV calculation",
    "Rieter RSB draw frame",
    "Truetzschler draw frame calculator"
  ],
  alternates: {
    canonical: "/drawing",
  },
  openGraph: {
    title: "Draw Frame Production & Delivery Speed Calculator | SpinCalc",
    description:
      "Calculate draw frame sliver production in lbs/shift and bags/day, delivery speeds up to 1000 m/min, and autoleveller doubling efficiency.",
    url: "https://spincalc.vercel.app/drawing",
  },
};

const formulas = [
  {
    name: "Draw Frame Production in lbs / 8-hr Shift",
    formula: "Production (lbs/shift) = (Delivery Speed (m/min) × 1.0936 × 60 × 8 × (Eff% / 100) × Sliver gr/yd × Deliveries) / 7,000",
    notes: "Applies to both breaker (non-autolevelled) and finisher (autolevelled) draw frame passages."
  },
  {
    name: "Total Draw Frame Draft",
    formula: "Total Draft = (Delivered Sliver Hank Ne / Infeed Sliver Hank Ne) × Number of Doublings",
    notes: "Alternatively: Total Draft = (Total Infeed Weight gr/yd × Doublings) / Delivered Sliver Weight gr/yd."
  },
  {
    name: "Production in Commercial 100-lb Bags",
    formula: "Bags / Shift = Total Production (lbs / shift) / 100",
    notes: "Multiply by 3 for daily 24-hour mill-floor bag production allocation."
  },
  {
    name: "Autoleveller Correction Range (A%)",
    formula: "A% = ((Actual Delivered Weight - Target Weight) / Target Weight) × 100",
    notes: "Autolevellers adjust draft dynamically within a ±25% mechanical correction limit."
  }
];

const variables = [
  {
    symbol: "Delivery Speed",
    name: "Calender Delivery Roller Speed",
    description: "Linear throughput speed of the delivered sliver passing into the rotary coiler.",
    typicalRange: "400 – 900 m/min"
  },
  {
    symbol: "Deliveries",
    name: "Heads per Draw Frame",
    description: "Single-delivery (1 delivery) for modern autolevellers (Rieter RSB); twin-delivery (2 heads) for breaker passages.",
    typicalRange: "1 or 2 deliveries"
  },
  {
    symbol: "Sliver Weight",
    name: "Finisher Delivered Sliver Weight",
    description: "Target linear density of the finished sliver fed to the Simplex/Roving frames.",
    typicalRange: "50 – 70 grains/yd (3.3 – 4.6 ktex)"
  },
  {
    symbol: "Doubling",
    name: "Number of Feed Slivers",
    description: "Number of carded or combed sliver cans fed simultaneously into the drafting system (typically 6 or 8).",
    typicalRange: "6 – 8 ends"
  },
  {
    symbol: "Eff %",
    name: "Machine Operational Efficiency",
    description: "Accounts for can doffing cycles, sliver breaks, sliver piecing, and autoleveller alarms.",
    typicalRange: "82% – 90%"
  }
];

const benchmarks = [
  {
    title: "Punjab (Faisalabad & Lahore)",
    region: "30s & 20s Carded Hosiery",
    observation: "Rieter RSB-D 50 autoleveller frames operate at 650–750 m/min delivery speed with 60–65 gr/yd sliver, keeping sliver CVm% under 2.4%."
  },
  {
    title: "Tamil Nadu (Coimbatore & Tirupur)",
    region: "40s Combed Compact Weaving",
    observation: "Finisher draw frames run at 550–650 m/min with 8 doublings. A% variation is kept strictly within ±0.8% to minimize count CV% on ring frames."
  },
  {
    title: "Bangladesh (Gazipur & Narayanganj)",
    region: "100% Export Knit Mills",
    observation: "Modern LMW LDF3 and Trützschler TD 10 draw frames maintain 88% overall efficiency with automatic can changers at 700 m/min."
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
          Draw Frame Production & Delivery Speed Calculator
        </h1>
        <p className="body-md text-on-surface-variant mt-2 max-w-3xl leading-relaxed">
          Calculate draw frame production in lbs/shift, 100-lb bags/day, delivery speed (m/min), sliver hank (grains/yd), and doubling draft efficiency for textile spinning mills.
        </p>
      </div>

      {/* Interactive Calculator */}
      <DrawingCalculator />

      {/* Crawlable Technical Formulas & Engineering Notes */}
      <TechnicalNotes
        departmentTitle="Draw Frame Department"
        formulas={formulas}
        variables={variables}
        benchmarks={benchmarks}
        technicalOverview="The Draw Frame performs two quintessential metallurgical functions in short-staple cotton spinning: fiber parallelization through roller drafting and mass homogenization through doubling (feeding 6 to 8 slivers simultaneously). Modern autoleveller draw frames continuously scan the entering mass variations via mechanical or optical sensors and adjust the main drafting ratio within milliseconds. Precision calculations of delivery speed (m/min), sliver grain weight, and delivery count are critical to meeting international Uster CV% benchmarks."
      />

      {/* Internal Linking & Process Flow Navigation */}
      <SpinningProcessNav currentRoute="/drawing" />
    </div>
  );
}
