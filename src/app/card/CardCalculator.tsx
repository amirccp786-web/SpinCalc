"use client";

import React, { useState } from "react";
import { InputField } from "@/components/ui/InputField";
import { CalculationCard } from "@/components/ui/CalculationCard";
import { Sliders, AlertTriangle } from "lucide-react";

export function CardCalculator() {
  const [machines, setMachines] = useState("1");
  const [deliverySpeed, setDeliverySpeed] = useState("160");
  const [sliverWeight, setSliverWeight] = useState("4.8");
  const [feedLapWeight, setFeedLapWeight] = useState("450");
  const [efficiency, setEfficiency] = useState("88");

  const calculateProduction = () => {
    const numMachines = parseFloat(machines) || 0;
    const speed = parseFloat(deliverySpeed) || 0;
    const sWeight = parseFloat(sliverWeight) || 0;
    const fWeight = parseFloat(feedLapWeight) || 0;
    const eff = parseFloat(efficiency) || 0;

    if (numMachines === 0 || speed === 0 || sWeight === 0 || eff === 0) {
      return { kgHr: 0, shiftKg: 0, shiftLb: 0, shiftBags: 0, dayKg: 0, dayLb: 0, dayBags: 0, totalDraft: 0 };
    }

    // Standard Textile Formulas:
    // Production (kg/hr) = (Delivery Speed [m/min] * 60 * Sliver Weight [g/m] / 1000) * (Eff% / 100)
    // Total Draft = Feed Lap Weight (g/m) / Delivered Sliver Weight (g/m)
    const singleKgHr = (speed * 60 * sWeight / 1000) * (eff / 100);
    const totalKgHr = singleKgHr * numMachines;
    const shiftKg = totalKgHr * 8;
    const shiftLb = shiftKg * 2.20462;
    const shiftBags = shiftLb / 100;

    const dayKg = shiftKg * 3;
    const dayLb = shiftLb * 3;
    const dayBags = shiftBags * 3;

    const totalDraft = fWeight > 0 ? fWeight / sWeight : 0;

    return {
      kgHr: totalKgHr,
      shiftKg,
      shiftLb,
      shiftBags,
      dayKg,
      dayLb,
      dayBags,
      totalDraft
    };
  };

  const prod = calculateProduction();
  const isHighSpeed = parseFloat(deliverySpeed) > 260;

  // Conversion reference grains/yd
  const grainsYd = (parseFloat(sliverWeight) || 0) * 14.17;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Column: Inputs */}
      <div className="w-full lg:w-5/12 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm">
        <h2 className="headline-md text-primary mb-6 flex items-center gap-2">
          <Sliders className="w-5 h-5 text-primary" aria-hidden="true" />
          Carding Parameters & Speed
        </h2>

        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <InputField
            label="Machines"
            unit="qty"
            type="number"
            value={machines}
            onChange={(e) => setMachines(e.target.value)}
          />

          <InputField
            label="Delivery Speed"
            unit="m/min"
            type="number"
            value={deliverySpeed}
            onChange={(e) => setDeliverySpeed(e.target.value)}
            error={isHighSpeed ? "Warning: Speed exceeds recommended limit (260 m/min)" : undefined}
          />

          <InputField
            label="Delivered Sliver Weight"
            unit="g/m"
            type="number"
            value={sliverWeight}
            onChange={(e) => setSliverWeight(e.target.value)}
          />

          <div className="text-[11px] font-jetbrains text-secondary pl-1 -mt-2">
            ≈ {grainsYd.toFixed(1)} grains/yard (1 g/m = 14.17 grains/yd)
          </div>

          <InputField
            label="Feed Lap / Chute Mat Weight"
            unit="g/m"
            type="number"
            value={feedLapWeight}
            onChange={(e) => setFeedLapWeight(e.target.value)}
          />

          <InputField
            label="Efficiency"
            unit="%"
            type="number"
            value={efficiency}
            onChange={(e) => setEfficiency(e.target.value)}
          />
        </form>

        <div className="mt-6 p-4 rounded-xl bg-surface-container-highest/40 border border-outline-variant/30 text-xs text-on-surface-variant font-jetbrains">
          <span className="text-secondary font-bold block mb-1">Standard Formulas Applied:</span>
          • Prod (kg/hr) = (Speed × 60 × Sliver g/m / 1000) × (Eff / 100)<br />
          • Total Draft = Feed Lap Weight (g/m) / Sliver Weight (g/m)
        </div>
      </div>

      {/* Right Column: Outputs */}
      <div className="w-full lg:w-7/12 flex flex-col gap-4">
        {isHighSpeed && (
          <div className="bg-[#FFFBEB] border border-[#F59E0B] text-[#B45309] p-4 rounded-xl flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" aria-hidden="true" />
            <span className="body-md text-xs sm:text-sm">
              Delivery speed is elevated. Inspect doffer clothing and web take-up tension to avoid web fly and fiber damage.
            </span>
          </div>
        )}

        <CalculationCard
          title="Total Mechanical Draft"
          value={
            <div className="flex items-baseline flex-wrap gap-2">
              <span className="text-secondary">{prod.totalDraft.toFixed(2)}</span>
              <span className="body-md text-on-surface-variant">draft ratio</span>
            </div>
          }
          status={prod.totalDraft > 0 ? "success" : "default"}
        />

        <CalculationCard
          title="Production Rate (kg / hr)"
          value={
            <div className="flex items-baseline flex-wrap gap-2">
              <span>{prod.kgHr.toFixed(2)}</span>
              <span className="body-md text-on-surface-variant">kg/hr</span>
              <span className="text-outline-variant mx-1">=</span>
              <span className="text-secondary">{(prod.kgHr * 2.20462).toFixed(2)}</span>
              <span className="body-md text-on-surface-variant">lbs/hr</span>
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
