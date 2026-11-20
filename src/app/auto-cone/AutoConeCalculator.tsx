"use client";

import React, { useState } from "react";
import { InputField } from "@/components/ui/InputField";
import { CalculationCard } from "@/components/ui/CalculationCard";
import { Sliders, AlertTriangle } from "lucide-react";

export function AutoConeCalculator() {
  const [machines, setMachines] = useState("1");
  const [drums, setDrums] = useState("60");
  const [windingSpeed, setWindingSpeed] = useState("1200");
  const [yarnCount, setYarnCount] = useState("30");
  const [efficiency, setEfficiency] = useState("85");

  const calculateProduction = () => {
    const numMachines = parseFloat(machines) || 0;
    const numDrums = parseFloat(drums) || 0;
    const speed = parseFloat(windingSpeed) || 0;
    const ne = parseFloat(yarnCount) || 0;
    const eff = parseFloat(efficiency) || 0;

    if (numMachines === 0 || numDrums === 0 || speed === 0 || ne === 0 || eff === 0) {
      return { kgDrumHr: 0, totalKgHr: 0, shiftKg: 0, shiftLb: 0, shiftBags: 0, dayKg: 0, dayLb: 0, dayBags: 0 };
    }

    // Standard Textile Formula:
    // Production (kg/drum/hr) = (Winding Speed [m/min] * 60 * 0.5905 / (Yarn Count Ne * 1000)) * (Eff% / 100)
    const kgDrumHr = (speed * 60 * 0.5905 / (ne * 1000)) * (eff / 100);
    const totalKgHr = kgDrumHr * numDrums * numMachines;

    const shiftKg = totalKgHr * 8;
    const shiftLb = shiftKg * 2.20462;
    const shiftBags = shiftLb / 100;

    const dayKg = shiftKg * 3;
    const dayLb = shiftLb * 3;
    const dayBags = shiftBags * 3;

    return {
      kgDrumHr,
      totalKgHr,
      shiftKg,
      shiftLb,
      shiftBags,
      dayKg,
      dayLb,
      dayBags
    };
  };

  const prod = calculateProduction();
  const isHighSpeed = parseFloat(windingSpeed) > 1700;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Column: Inputs */}
      <div className="w-full lg:w-5/12 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm">
        <h2 className="headline-md text-primary mb-6 flex items-center gap-2">
          <Sliders className="w-5 h-5 text-primary" aria-hidden="true" />
          Auto Cone Parameters & Winding Speed
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
              label="Drums / Machine"
              unit="drums"
              type="number"
              value={drums}
              onChange={(e) => setDrums(e.target.value)}
            />
          </div>

          <InputField
            label="Winding Speed"
            unit="m/min"
            type="number"
            value={windingSpeed}
            onChange={(e) => setWindingSpeed(e.target.value)}
            error={isHighSpeed ? "Warning: Speed exceeds recommended limit (1700 m/min)" : undefined}
          />

          <InputField
            label="Yarn Count"
            unit="Ne"
            type="number"
            value={yarnCount}
            onChange={(e) => setYarnCount(e.target.value)}
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
          <span className="text-secondary font-bold block mb-1">Standard Formula Applied:</span>
          Production (kg/drum/hr) = (Winding Speed × 60 × 0.5905 / (Count Ne × 1000)) × (Eff / 100)
        </div>
      </div>

      {/* Right Column: Outputs */}
      <div className="w-full lg:w-7/12 flex flex-col gap-4">
        {isHighSpeed && (
          <div className="bg-[#FFFBEB] border border-[#F59E0B] text-[#B45309] p-4 rounded-xl flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" aria-hidden="true" />
            <span className="body-md text-xs sm:text-sm">
              Winding speed is extremely high. High risk of yarn hairiness increase, tension peaks, and package sloughing.
            </span>
          </div>
        )}

        <CalculationCard
          title="Production per Drum"
          value={
            <div className="flex items-baseline flex-wrap gap-2">
              <span>{prod.kgDrumHr.toFixed(3)}</span>
              <span className="body-md text-on-surface-variant">kg/drum/hr</span>
              <span className="text-outline-variant mx-1">=</span>
              <span className="text-secondary">{(prod.kgDrumHr * 2.20462).toFixed(3)}</span>
              <span className="body-md text-on-surface-variant">lbs/drum/hr</span>
            </div>
          }
          status={prod.kgDrumHr > 0 ? "success" : "default"}
        />

        <CalculationCard
          title="Total Machine Production Rate"
          value={
            <div className="flex items-baseline flex-wrap gap-2">
              <span>{prod.totalKgHr.toFixed(2)}</span>
              <span className="body-md text-on-surface-variant">kg/hr</span>
              <span className="text-outline-variant mx-1">=</span>
              <span className="text-secondary">{(prod.totalKgHr * 2.20462).toFixed(2)}</span>
              <span className="body-md text-on-surface-variant">lbs/hr</span>
            </div>
          }
          status={prod.totalKgHr > 0 ? "success" : "default"}
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
