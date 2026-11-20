"use client";

import React, { useState } from "react";
import { InputField } from "@/components/ui/InputField";
import { CalculationCard } from "@/components/ui/CalculationCard";
import { Sliders, AlertTriangle } from "lucide-react";

export function ComberCalculator() {
  const [machines, setMachines] = useState("1");
  const [noOfHeads, setNoOfHeads] = useState("8");
  const [nipsPerMin, setNipsPerMin] = useState("350");
  const [feedPerNip, setFeedPerNip] = useState("5.2");
  const [lapWeight, setLapWeight] = useState("1000"); // grains/yd
  const [noilPercentage, setNoilPercentage] = useState("16");
  const [efficiency, setEfficiency] = useState("85");

  const calculateProduction = () => {
    const numMachines = parseFloat(machines) || 0;
    const heads = parseFloat(noOfHeads) || 0;
    const nips = parseFloat(nipsPerMin) || 0;
    const feed = parseFloat(feedPerNip) || 0;
    const weight = parseFloat(lapWeight) || 0;
    const noil = parseFloat(noilPercentage) || 0;
    const eff = parseFloat(efficiency) || 0;

    if (numMachines === 0 || heads === 0 || nips === 0 || feed === 0 || weight === 0) return 0;

    // Delivery speed from nips and feed:
    // Speed(m/min) = Nips/min * Feed(mm) / 1000
    const speed = (nips * feed) / 1000;

    // Formula for comber production in lbs/shift (8 hours):
    // Speed(m/min) * 60 * 8 * Eff/100 * Weight(grains/yd) * 1.0936 / 7000 * (1 - (noil / 100))
    const prodLb = (speed * 60 * 8 * (eff / 100) * weight * 1.0936 * (1 - (noil / 100))) / 7000;
    return prodLb * numMachines * heads;
  };

  const rawProdLb = calculateProduction();
  const prodLb = rawProdLb.toFixed(2);
  const prodBags = (rawProdLb / 100).toFixed(2);
  const prodKg = (rawProdLb / 2.20462).toFixed(2);

  const rawProdDayLb = rawProdLb * 3;
  const prodDayLb = rawProdDayLb.toFixed(2);
  const prodDayBags = (rawProdDayLb / 100).toFixed(2);
  const prodDayKg = (rawProdDayLb / 2.20462).toFixed(2);

  const isHighSpeed = parseFloat(nipsPerMin) > 500;

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
              value={noOfHeads}
              onChange={(e) => setNoOfHeads(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Nips per Minute"
              unit="nips/min"
              type="number"
              value={nipsPerMin}
              onChange={(e) => setNipsPerMin(e.target.value)}
              error={isHighSpeed ? "Warning: Speed exceeds recommended limit (500)" : undefined}
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
            unit="grains/yd"
            type="number"
            value={lapWeight}
            onChange={(e) => setLapWeight(e.target.value)}
          />

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
          Prod (lbs/shift) = (Speed × 60 × 8 × Eff/100 × Lap [gr/yd] × 1.0936 × (1 - Noil%/100) × Heads) / 7000
        </div>
      </div>

      {/* Right Column: Outputs */}
      <div className="w-full lg:w-7/12 flex flex-col gap-4">
        {isHighSpeed && (
          <div className="bg-[#FFFBEB] border border-[#F59E0B] text-[#B45309] p-4 rounded-xl flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" aria-hidden="true" />
            <span className="body-md text-xs sm:text-sm">
              Nips per minute is critically high. High risk of fiber breakage and top comb wear.
            </span>
          </div>
        )}

        <CalculationCard
          title="Total Production / Shift (8 Hours)"
          value={
            <div className="flex items-baseline flex-wrap gap-2">
              <span>{prodLb}</span>
              <span className="body-md text-on-surface-variant">lbs</span>
              <span className="text-outline-variant mx-1">=</span>
              <span className="text-secondary font-bold">{prodBags}</span>
              <span className="body-md text-on-surface-variant">bags</span>
              <span className="text-outline-variant mx-1">|</span>
              <span className="text-secondary">{prodKg}</span>
              <span className="body-md text-on-surface-variant">kg</span>
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
              <span className="text-secondary font-bold">{prodDayBags}</span>
              <span className="body-md text-on-surface-variant">bags</span>
              <span className="text-outline-variant mx-1">|</span>
              <span className="text-secondary">{prodDayKg}</span>
              <span className="body-md text-on-surface-variant">kg</span>
            </div>
          }
          status={prodDayLb !== "0.00" ? "success" : "default"}
        />
      </div>
    </div>
  );
}
