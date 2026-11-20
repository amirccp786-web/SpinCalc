"use client";

import React, { useState } from "react";
import { InputField } from "@/components/ui/InputField";
import { CalculationCard } from "@/components/ui/CalculationCard";

export function CardCalculator() {
  const [machines, setMachines] = useState("1");
  const [deliverySpeed, setDeliverySpeed] = useState("150");
  const [sliverWeight, setSliverWeight] = useState("70");
  const [efficiency, setEfficiency] = useState("85");

  const calculateProduction = () => {
    const numMachines = parseFloat(machines) || 0;
    const speed = parseFloat(deliverySpeed) || 0;
    const weight = parseFloat(sliverWeight) || 0;
    const eff = parseFloat(efficiency) || 0;

    if (numMachines === 0 || speed === 0 || weight === 0) return 0;

    // Formula for card production in lbs/shift (8 hours):
    // Speed(m/min) * 60 * 8 * Eff/100 = meters/shift
    // meters * 1.0936 = yards
    // yards * grains/yd = grains
    // grains / 7000 = lbs
    const prodLb = (speed * 60 * 8 * (eff / 100) * weight * 1.0936) / 7000;
    return prodLb * numMachines;
  };

  const rawProdLb = calculateProduction();
  const prodLb = rawProdLb.toFixed(2);
  const prodBags = (rawProdLb / 100).toFixed(2);

  const rawProdDayLb = rawProdLb * 3;
  const prodDayLb = rawProdDayLb.toFixed(2);
  const prodDayBags = (rawProdDayLb / 100).toFixed(2);

  const isHighSpeed = parseFloat(deliverySpeed) > 250;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Column: Inputs */}
      <div className="w-full lg:w-5/12 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm">
        <h2 className="headline-md text-primary mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">tune</span>
          Input Parameters & Speeds
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
            error={isHighSpeed ? "Warning: Speed exceeds recommended limit (250 m/min)" : undefined}
          />
          <InputField
            label="Sliver Weight"
            unit="grains/yd"
            type="number"
            value={sliverWeight}
            onChange={(e) => setSliverWeight(e.target.value)}
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
            <span className="body-md">Delivery speed is extremely high. High risk of fiber damage and web fly.</span>
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
