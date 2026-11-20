"use client";

import React, { useState } from "react";
import { InputField } from "@/components/ui/InputField";
import { CalculationCard } from "@/components/ui/CalculationCard";

export function AutoConeCalculator() {
  const [machines, setMachines] = useState("1");
  const [windingSpeed, setWindingSpeed] = useState("1200");
  const [yarnCount, setYarnCount] = useState("30");
  const [efficiency, setEfficiency] = useState("85");
  const [drums, setDrums] = useState("60");

  const calculateProduction = () => {
    const numMachines = parseFloat(machines) || 0;
    const speed = parseFloat(windingSpeed) || 0;
    const ne = parseFloat(yarnCount) || 0;
    const eff = parseFloat(efficiency) || 0;
    const numDrums = parseFloat(drums) || 0;

    if (numMachines === 0 || speed === 0 || ne === 0 || numDrums === 0) return 0;

    // Formula for winding production in kg/shift (8 hours) per machine:
    // Prod (kg) = (Speed(m/min) * 60 * 8 * Eff/100 * Drums) / (Ne * 1693.3)
    const prodKg = (speed * 60 * 8 * (eff / 100) * numDrums) / (ne * 1693.3);
    const prodLb = prodKg * 2.20462 * numMachines;
    return prodLb;
  };

  const rawProdLb = calculateProduction();
  const prodLb = rawProdLb.toFixed(2);
  const prodBags = (rawProdLb / 100).toFixed(2);

  const rawProdDayLb = rawProdLb * 3;
  const prodDayLb = rawProdDayLb.toFixed(2);
  const prodDayBags = (rawProdDayLb / 100).toFixed(2);

  const isHighSpeed = parseFloat(windingSpeed) > 1800;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Column: Inputs */}
      <div className="w-full lg:w-5/12 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm">
        <h2 className="headline-md text-primary mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">tune</span>
          Input Parameters & Winding Speed
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
            label="Winding Speed"
            unit="m/min"
            type="number"
            value={windingSpeed}
            onChange={(e) => setWindingSpeed(e.target.value)}
            error={isHighSpeed ? "Warning: Speed exceeds recommended limit (1800 m/min)" : undefined}
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
          <InputField
            label="Number of Drums"
            type="number"
            value={drums}
            onChange={(e) => setDrums(e.target.value)}
          />
        </form>

        <button
          type="button"
          onClick={() => {}}
          className="w-full bg-primary-container text-on-primary-container h-12 rounded-lg mt-8 font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">sync</span>
          Calculate Production
        </button>
      </div>

      {/* Right Column: Outputs */}
      <div className="w-full lg:w-7/12 flex flex-col gap-4">
        {isHighSpeed && (
          <div className="bg-[#FFFBEB] border border-[#F59E0B] text-[#B45309] p-4 rounded-xl flex items-center gap-3">
            <span className="material-symbols-outlined text-amber-600">warning</span>
            <span className="body-md">Winding speed is extremely high. High risk of yarn hairiness increase and tension sloughing.</span>
          </div>
        )}

        <CalculationCard
          title="Total Production / Shift (8 Hours)"
          value={
            <div className="flex items-baseline flex-wrap gap-2">
              <span>{prodLb}</span>
              <span className="body-md text-on-surface-variant">lbs</span>
              <span className="text-outline-variant mx-1">=</span>
              <span className="text-secondary">{prodBags}</span>
              <span className="body-md text-on-surface-variant">bags</span>
            </div>
          }
          status={prodLb !== "0.00" ? "success" : "default"}
        />

        <CalculationCard
          title="Total Production / Day (24 Hours)"
          value={
            <div className="flex items-baseline flex-wrap gap-2">
              <span>{prodDayLb}</span>
              <span className="body-md text-on-surface-variant">lbs</span>
              <span className="text-outline-variant mx-1">=</span>
              <span className="text-secondary">{prodDayBags}</span>
              <span className="body-md text-on-surface-variant">bags</span>
            </div>
          }
          status={prodDayLb !== "0.00" ? "success" : "default"}
        />
      </div>
    </div>
  );
}
