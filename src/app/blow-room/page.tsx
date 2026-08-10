"use client";

import React, { useState } from "react";
import { InputField } from "@/components/ui/InputField";
import { CalculationCard } from "@/components/ui/CalculationCard";

export default function BlowRoomCalculator() {
  const [method, setMethod] = useState<"rate" | "rpm">("rate");

  // General state
  const [machines, setMachines] = useState("1");
  const [efficiency, setEfficiency] = useState("85");

  // Method: Rate
  const [productionRate, setProductionRate] = useState("800");

  // Method: RPM
  const [rollerDiameter, setRollerDiameter] = useState("7");
  const [rollerRpm, setRollerRpm] = useState("12");
  const [lapWeight, setLapWeight] = useState("14");
  const [wastePercentage, setWastePercentage] = useState("4");

  const calculateProduction = () => {
    const numMachines = parseFloat(machines) || 0;
    const eff = parseFloat(efficiency) || 0;

    if (numMachines === 0 || eff === 0) return 0;

    if (method === "rate") {
      const rate = parseFloat(productionRate) || 0;
      if (rate === 0) return 0;
      
      // Formula for blow room production in kg/shift (8 hours):
      const prodKg = rate * 8 * (eff / 100);
      const prodLb = prodKg * 2.20462 * numMachines;
      return prodLb;
    } else {
      const d = parseFloat(rollerDiameter) || 0;
      const n = parseFloat(rollerRpm) || 0;
      const weight = parseFloat(lapWeight) || 0;
      const w = parseFloat(wastePercentage) || 0;
      
      if (d === 0 || n === 0 || weight === 0) return 0;

      // Formula: Production (lbs/shift) = (pi * D * N * 60 * 8 * Eff * (100 - W) * Scutchers * LapWeight) / (36 * 16 * 100 * 100)
      // Simplified: (pi * D * N * LapWeight * Eff * (100 - W) * Scutchers) / 12000
      const prodLb = (Math.PI * d * n * weight * eff * (100 - w) * numMachines) / 12000;
      return prodLb;
    }
  };

  const rawProdLb = calculateProduction();
  const prodLb = rawProdLb.toFixed(2);
  const prodBags = (rawProdLb / 100).toFixed(2);

  const rawProdDayLb = rawProdLb * 3;
  const prodDayLb = rawProdDayLb.toFixed(2);
  const prodDayBags = (rawProdDayLb / 100).toFixed(2);

  const isHighSpeed = method === "rate" ? parseFloat(productionRate) > 1200 : parseFloat(rollerRpm) > 20;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-12 flex flex-col lg:flex-row gap-8">
      {/* Left Column: Inputs */}
      <div className="w-full lg:w-5/12 bg-surface-container-lowest p-6 rounded-lg border border-outline-variant">
        <h2 className="headline-md text-primary mb-6">Blow Room Calculator</h2>

        <div className="flex gap-6 mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="method" 
              value="rate" 
              checked={method === "rate"} 
              onChange={() => setMethod("rate")} 
              className="accent-primary w-4 h-4"
            />
            <span className="body-md">By Production Rate</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="method" 
              value="rpm" 
              checked={method === "rpm"} 
              onChange={() => setMethod("rpm")} 
              className="accent-primary w-4 h-4"
            />
            <span className="body-md">By Scutcher RPM</span>
          </label>
        </div>

        <form className="flex flex-col gap-4">
          <InputField
            label={method === "rate" ? "Machines (Lines)" : "No. of Scutchers"}
            unit="qty"
            type="number"
            value={machines}
            onChange={(e) => setMachines(e.target.value)}
          />

          {method === "rate" ? (
            <InputField
              label="Production Rate"
              unit="kg/hr"
              type="number"
              value={productionRate}
              onChange={(e) => setProductionRate(e.target.value)}
              error={isHighSpeed ? "Warning: Rate exceeds recommended limit" : undefined}
            />
          ) : (
            <>
              <InputField
                label="Bottom Calender Roller Dia"
                unit="inches"
                type="number"
                value={rollerDiameter}
                onChange={(e) => setRollerDiameter(e.target.value)}
              />
              <InputField
                label="Calender Roller RPM"
                unit="RPM"
                type="number"
                value={rollerRpm}
                onChange={(e) => setRollerRpm(e.target.value)}
                error={isHighSpeed ? "Warning: RPM exceeds recommended limit" : undefined}
              />
              <InputField
                label="Lap Weight"
                unit="oz/yard"
                type="number"
                value={lapWeight}
                onChange={(e) => setLapWeight(e.target.value)}
              />
              <InputField
                label="Waste"
                unit="%"
                type="number"
                value={wastePercentage}
                onChange={(e) => setWastePercentage(e.target.value)}
              />
            </>
          )}

          <InputField
            label="Efficiency"
            unit="%"
            type="number"
            value={efficiency}
            onChange={(e) => setEfficiency(e.target.value)}
          />
        </form>

        <button className="w-full bg-primary-container text-on-primary-container h-12 rounded-md mt-8 font-semibold hover:opacity-90 transition-opacity">
          Calculate
        </button>
      </div>

      {/* Right Column: Outputs */}
      <div className="w-full lg:w-7/12 flex flex-col gap-4">
        {isHighSpeed && (
          <div className="bg-[#FFFBEB] border border-[#F59E0B] text-[#B45309] p-4 rounded-lg flex items-center gap-3">
            <span className="material-symbols-outlined">warning</span>
            <span className="body-md">
              {method === "rate" ? "Production rate" : "Scutcher RPM"} is extremely high. High risk of fiber damage.
            </span>
          </div>
        )}

        <CalculationCard
          title="Total Production / Shift"
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
          title="Total Production / Day"
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
