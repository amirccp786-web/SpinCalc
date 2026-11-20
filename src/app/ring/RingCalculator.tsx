"use client";

import React, { useState } from "react";
import { InputField } from "@/components/ui/InputField";
import { CalculationCard } from "@/components/ui/CalculationCard";

export function RingCalculator() {
  const [machines, setMachines] = useState("1");
  const [spindles, setSpindles] = useState("1200");
  const [spindleSpeed, setSpindleSpeed] = useState("18000");
  const [countNe, setCountNe] = useState("30");
  const [tpi, setTpi] = useState("19.5");
  const [efficiency, setEfficiency] = useState("92");

  const calculateProduction = () => {
    const numMachines = parseFloat(machines) || 0;
    const numSpindles = parseFloat(spindles) || 0;
    const rpm = parseFloat(spindleSpeed) || 0;
    const ne = parseFloat(countNe) || 0;
    const twist = parseFloat(tpi) || 0;
    const eff = parseFloat(efficiency) || 0;

    if (numMachines === 0 || numSpindles === 0 || rpm === 0 || ne === 0 || twist === 0) return 0;

    // Formula for ring spinning production in lbs/shift (8 hours):
    // Lbs / Spindle = (RPM * 60 * 8 * (Eff/100)) / (TPI * 36 * 840 * Ne)
    const lbsPerSpindle = (rpm * 60 * 8 * (eff / 100)) / (twist * 36 * 840 * ne);
    return lbsPerSpindle * numSpindles * numMachines;
  };

  const rawProdLb = calculateProduction();
  const prodLb = rawProdLb.toFixed(2);
  const prodBags = (rawProdLb / 100).toFixed(2);

  const numMachines = parseFloat(machines) || 0;
  const numSpindles = parseFloat(spindles) || 0;
  const totalSpindlesAndMachines = numSpindles * numMachines;
  const ops = totalSpindlesAndMachines > 0 ? (rawProdLb / totalSpindlesAndMachines) * 16 : 0;
  const prodOps = ops.toFixed(2);

  const rawProdDayLb = rawProdLb * 3;
  const prodDayLb = rawProdDayLb.toFixed(2);
  const prodDayBags = (rawProdDayLb / 100).toFixed(2);

  const isHighSpeed = parseFloat(spindleSpeed) > 22000;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Column: Inputs */}
      <div className="w-full lg:w-5/12 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm">
        <h2 className="headline-md text-primary mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">tune</span>
          Input Parameters & Yarn Count
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
            label="Spindles per Machine"
            unit="qty"
            type="number"
            value={spindles}
            onChange={(e) => setSpindles(e.target.value)}
          />
          <InputField
            label="Spindle Speed"
            unit="RPM"
            type="number"
            value={spindleSpeed}
            onChange={(e) => setSpindleSpeed(e.target.value)}
            error={isHighSpeed ? "Warning: Speed exceeds standard mechanical limit (22,000 RPM)" : undefined}
          />
          <InputField
            label="Yarn Count"
            unit="Ne"
            type="number"
            value={countNe}
            onChange={(e) => setCountNe(e.target.value)}
          />
          <InputField
            label="Twist per Inch"
            unit="TPI"
            type="number"
            value={tpi}
            onChange={(e) => setTpi(e.target.value)}
          />
          <InputField
            label="Efficiency"
            unit="%"
            type="number"
            value={efficiency}
            onChange={(e) => setEfficiency(e.target.value)}
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
            <span className="body-md">Spindle speed is critically high. Verify traveler burn limits and machine mechanical tolerances.</span>
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
              <span className="text-outline-variant mx-1">|</span>
              <span className="text-secondary">{prodOps}</span>
              <span className="body-md text-on-surface-variant">OPS</span>
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
