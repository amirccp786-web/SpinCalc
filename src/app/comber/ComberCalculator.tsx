"use client";

import React, { useState } from "react";
import { InputField } from "@/components/ui/InputField";
import { CalculationCard } from "@/components/ui/CalculationCard";
import { Sliders, AlertTriangle } from "lucide-react";

export function ComberCalculator() {
  const [machines, setMachines] = useState("1");
  const [heads, setHeads] = useState("8");
  const [nipsPerMin, setNipsPerMin] = useState("400");
  const [feedPerNip, setFeedPerNip] = useState("5.0");
  const [lapWeight, setLapWeight] = useState("70");
  const [noilPercentage, setNoilPercentage] = useState("16");
  const [efficiency, setEfficiency] = useState("85");

  const calculateProduction = () => {
    const numMachines = parseFloat(machines) || 0;
    const numHeads = parseFloat(heads) || 0;
    const nips = parseFloat(nipsPerMin) || 0;
    const feed = parseFloat(feedPerNip) || 0;
    const lWeight = parseFloat(lapWeight) || 0;
    const noil = parseFloat(noilPercentage) || 0;
    const eff = parseFloat(efficiency) || 0;

    if (numMachines === 0 || numHeads === 0 || nips === 0 || feed === 0 || lWeight === 0 || eff === 0) {
      return { kgHr: 0, kgHrHead: 0, shiftKg: 0, shiftLb: 0, shiftBags: 0, dayKg: 0, dayLb: 0, dayBags: 0 };
    }

    // Standard Textile Formula:
    // Production (kg/hr) = (Nips/min * Feed/nip [mm] * Lap Weight [g/m] * Heads * 60 / 1,000,000) * (1 - Noil%/100) * (Eff%/100)
    const grossInfeedKgHr = (nips * feed * lWeight * numHeads * 60) / 1000000;
    const netDeliveredKgHr = grossInfeedKgHr * (1 - noil / 100) * (eff / 100);
    const totalKgHr = netDeliveredKgHr * numMachines;
    const kgHrHead = totalKgHr / (numHeads * numMachines);

    const shiftKg = totalKgHr * 8;
    const shiftLb = shiftKg * 2.20462;
    const shiftBags = shiftLb / 100;

    const dayKg = shiftKg * 3;
    const dayLb = shiftLb * 3;
    const dayBags = shiftBags * 3;

    return {
      kgHr: totalKgHr,
      kgHrHead,
      shiftKg,
      shiftLb,
      shiftBags,
      dayKg,
      dayLb,
      dayBags
    };
  };

  const prod = calculateProduction();
  const isHighSpeed = parseFloat(nipsPerMin) > 500;

  // Conversion reference grains/yd
  const grainsYd = (parseFloat(lapWeight) || 0) * 14.17;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Column: Inputs */}
      <div className="w-full lg:w-5/12 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm">
        <h2 className="headline-md text-primary mb-6 flex items-center gap-2">
          <Sliders className="w-5 h-5 text-primary" aria-hidden="true" />
          Comber Parameters & Nips
        </h2>

        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Machines"
              unit="qty"
              type="number"
              value={machines}
              onChange={(e) => setMachines(e.target.value)}
            />
            <InputField
              label="Heads per Machine"
              unit="heads"
              type="number"
              value={heads}
              onChange={(e) => setHeads(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Nips per Minute"
              unit="nips/min"
              type="number"
              value={nipsPerMin}
              onChange={(e) => setNipsPerMin(e.target.value)}
              error={isHighSpeed ? "Warning: Nips exceed recommended limit (500)" : undefined}
            />
            <InputField
              label="Feed per Nip"
              unit="mm"
              type="number"
              value={feedPerNip}
              onChange={(e) => setFeedPerNip(e.target.value)}
            />
          </div>

          <InputField
            label="Comber Lap Weight"
            unit="g/m"
            type="number"
            value={lapWeight}
            onChange={(e) => setLapWeight(e.target.value)}
          />

          <div className="text-[11px] font-jetbrains text-secondary pl-1 -mt-2">
            ≈ {grainsYd.toFixed(0)} grains/yard (1 g/m = 14.17 grains/yd)
          </div>

          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Noil Extraction"
              unit="%"
              type="number"
              value={noilPercentage}
              onChange={(e) => setNoilPercentage(e.target.value)}
            />
            <InputField
              label="Efficiency"
              unit="%"
              type="number"
              value={efficiency}
              onChange={(e) => setEfficiency(e.target.value)}
            />
          </div>
        </form>

        <div className="mt-6 p-4 rounded-xl bg-surface-container-highest/40 border border-outline-variant/30 text-xs text-on-surface-variant font-jetbrains">
          <span className="text-secondary font-bold block mb-1">Standard Formula Applied:</span>
          Production (kg/hr) = (Nips × Feed [mm] × Lap [g/m] × Heads × 60 / 1,000,000) × (1 - Noil%/100) × (Eff/100)
        </div>
      </div>

      {/* Right Column: Outputs */}
      <div className="w-full lg:w-7/12 flex flex-col gap-4">
        {isHighSpeed && (
          <div className="bg-[#FFFBEB] border border-[#F59E0B] text-[#B45309] p-4 rounded-xl flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" aria-hidden="true" />
            <span className="body-md text-xs sm:text-sm">
              Nips per minute is critically high. Inspect top comb wire needle sharpness and detaching roller timing.
            </span>
          </div>
        )}

        <CalculationCard
          title="Machine Production Rate (kg / hr)"
          value={
            <div className="flex items-baseline flex-wrap gap-2">
              <span>{prod.kgHr.toFixed(2)}</span>
              <span className="body-md text-on-surface-variant">kg/hr</span>
              <span className="text-outline-variant mx-1">=</span>
              <span className="text-secondary">{(prod.kgHr * 2.20462).toFixed(2)}</span>
              <span className="body-md text-on-surface-variant">lbs/hr</span>
              <span className="text-outline-variant mx-1">|</span>
              <span className="text-secondary text-sm">{prod.kgHrHead.toFixed(2)}</span>
              <span className="text-xs text-on-surface-variant">kg/hr/head</span>
            </div>
          }
          status={prod.kgHr > 0 ? "success" : "default"}
        />

        <CalculationCard
          title="Total Production / Shift (8 Hours)"
          value={
            <div className="flex items-baseline flex-wrap gap-2">
              <span>{prod.shiftKg.toFixed(2)}</span>
              <span className="body-md text-on-surface-variant">kg</span>
              <span className="text-outline-variant mx-1">|</span>
              <span>{prod.shiftLb.toFixed(2)}</span>
              <span className="body-md text-on-surface-variant">lbs</span>
              <span className="text-outline-variant mx-1">=</span>
              <span className="text-secondary font-bold">{prod.shiftBags.toFixed(2)}</span>
              <span className="body-md text-on-surface-variant">bags (100 lb)</span>
            </div>
          }
          status={prod.shiftKg > 0 ? "success" : "default"}
        />

        <CalculationCard
          title="Total Production / Day (24 Hours)"
          value={
            <div className="flex items-baseline flex-wrap gap-2">
              <span>{prod.dayKg.toFixed(2)}</span>
              <span className="body-md text-on-surface-variant">kg</span>
              <span className="text-outline-variant mx-1">=</span>
              <span className="text-secondary font-bold">{prod.dayBags.toFixed(2)}</span>
              <span className="body-md text-on-surface-variant">bags/day</span>
            </div>
          }
          status={prod.dayKg > 0 ? "success" : "default"}
        />
      </div>
    </div>
  );
}
