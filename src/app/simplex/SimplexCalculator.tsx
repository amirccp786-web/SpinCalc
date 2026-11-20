"use client";

import React, { useState } from "react";
import { InputField } from "@/components/ui/InputField";
import { CalculationCard } from "@/components/ui/CalculationCard";
import { Sliders, AlertTriangle } from "lucide-react";

export function SimplexCalculator() {
  const [machines, setMachines] = useState("1");
  const [spindles, setSpindles] = useState("120");
  const [spindleSpeed, setSpindleSpeed] = useState("1000");
  const [rovingHank, setRovingHank] = useState("1.20");
  const [twistMultiplier, setTwistMultiplier] = useState("1.15");
  const [efficiency, setEfficiency] = useState("88");

  const calculateProduction = () => {
    const numMachines = parseFloat(machines) || 0;
    const numSpindles = parseFloat(spindles) || 0;
    const rpm = parseFloat(spindleSpeed) || 0;
    const hank = parseFloat(rovingHank) || 0;
    const tm = parseFloat(twistMultiplier) || 0;
    const eff = parseFloat(efficiency) || 0;

    if (numMachines === 0 || numSpindles === 0 || rpm === 0 || hank === 0 || tm === 0 || eff === 0) {
      return { tpi: 0, delivSpeed: 0, kgSpindleHr: 0, totalKgHr: 0, shiftKg: 0, shiftLb: 0, shiftBags: 0, dayKg: 0, dayLb: 0, dayBags: 0 };
    }

    // Standard Textile Formulas:
    // 1. TPI = TM * sqrt(Roving Hank)
    // 2. Delivery Speed (m/min) = Spindle RPM / (TPI * 39.37)
    // 3. Production (kg/spindle/hr) = (Delivery Speed [m/min] * 60 * 0.5905 / (Roving Hank * 1000)) * (Eff% / 100)
    const tpi = tm * Math.sqrt(hank);
    const delivSpeed = tpi > 0 ? rpm / (tpi * 39.37) : 0;
    const kgSpindleHr = (delivSpeed * 60 * 0.5905 / (hank * 1000)) * (eff / 100);
    const totalKgHr = kgSpindleHr * numSpindles * numMachines;

    const shiftKg = totalKgHr * 8;
    const shiftLb = shiftKg * 2.20462;
    const shiftBags = shiftLb / 100;

    const dayKg = shiftKg * 3;
    const dayLb = shiftLb * 3;
    const dayBags = shiftBags * 3;

    return {
      tpi,
      delivSpeed,
      kgSpindleHr,
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
  const isHighSpeed = parseFloat(spindleSpeed) > 1400;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Column: Inputs */}
      <div className="w-full lg:w-5/12 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm">
        <h2 className="headline-md text-primary mb-6 flex items-center gap-2">
          <Sliders className="w-5 h-5 text-primary" aria-hidden="true" />
          Simplex Parameters & Flyer Speed
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
              label="Spindles / Machine"
              unit="spindles"
              type="number"
              value={spindles}
              onChange={(e) => setSpindles(e.target.value)}
            />
          </div>

          <InputField
            label="Spindle / Flyer Speed"
            unit="RPM"
            type="number"
            value={spindleSpeed}
            onChange={(e) => setSpindleSpeed(e.target.value)}
            error={isHighSpeed ? "Warning: Speed exceeds recommended flyer limit (1400 RPM)" : undefined}
          />

          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Roving Hank"
              unit="Ne"
              type="number"
              value={rovingHank}
              onChange={(e) => setRovingHank(e.target.value)}
            />
            <InputField
              label="Twist Multiplier (TM)"
              unit="TM"
              type="number"
              step="0.01"
              value={twistMultiplier}
              onChange={(e) => setTwistMultiplier(e.target.value)}
            />
          </div>

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
          • TPI = TM × √(Roving Hank)<br />
          • Delivery Speed = Spindle RPM / (TPI × 39.37)<br />
          • Prod (kg/sp/hr) = (Speed × 60 × 0.5905 / (Ne × 1000)) × (Eff / 100)
        </div>
      </div>

      {/* Right Column: Outputs */}
      <div className="w-full lg:w-7/12 flex flex-col gap-4">
        {isHighSpeed && (
          <div className="bg-[#FFFBEB] border border-[#F59E0B] text-[#B45309] p-4 rounded-xl flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" aria-hidden="true" />
            <span className="body-md text-xs sm:text-sm">
              Flyer speed is critically high. Inspect roving tension, flyer balance, and bobbin package buildup.
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CalculationCard
            title="Calculated Twist (TPI)"
            value={
              <div className="flex items-baseline flex-wrap gap-2">
                <span className="text-secondary">{prod.tpi.toFixed(2)}</span>
                <span className="body-md text-on-surface-variant">TPI</span>
              </div>
            }
            status={prod.tpi > 0 ? "success" : "default"}
          />

          <CalculationCard
            title="Delivery Speed"
            value={
              <div className="flex items-baseline flex-wrap gap-2">
                <span className="text-secondary">{prod.delivSpeed.toFixed(2)}</span>
                <span className="body-md text-on-surface-variant">m/min</span>
              </div>
            }
            status={prod.delivSpeed > 0 ? "success" : "default"}
          />
        </div>

        <CalculationCard
          title="Production per Spindle"
          value={
            <div className="flex items-baseline flex-wrap gap-2">
              <span>{prod.kgSpindleHr.toFixed(4)}</span>
              <span className="body-md text-on-surface-variant">kg/spindle/hr</span>
              <span className="text-outline-variant mx-1">=</span>
              <span className="text-secondary">{(prod.kgSpindleHr * 1000).toFixed(1)}</span>
              <span className="body-md text-on-surface-variant">g/sp-hr</span>
            </div>
          }
          status={prod.kgSpindleHr > 0 ? "success" : "default"}
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
