"use client";

import React, { useState } from "react";
import { InputField } from "@/components/ui/InputField";
import { CalculationCard } from "@/components/ui/CalculationCard";
import { Sliders, AlertTriangle } from "lucide-react";

export function DrawingCalculator() {
  const [machines, setMachines] = useState("1");
  const [deliveries, setDeliveries] = useState("2");
  const [deliverySpeed, setDeliverySpeed] = useState("500");
  const [sliverWeight, setSliverWeight] = useState("4.2");
  const [feedSliverWeight, setFeedSliverWeight] = useState("4.5");
  const [doublings, setDoublings] = useState("8");
  const [efficiency, setEfficiency] = useState("85");

  const calculateProduction = () => {
    const numMachines = parseFloat(machines) || 0;
    const numDeliv = parseFloat(deliveries) || 0;
    const speed = parseFloat(deliverySpeed) || 0;
    const delivWeight = parseFloat(sliverWeight) || 0;
    const feedWeight = parseFloat(feedSliverWeight) || 0;
    const numDoublings = parseFloat(doublings) || 0;
    const eff = parseFloat(efficiency) || 0;

    if (numMachines === 0 || numDeliv === 0 || speed === 0 || delivWeight === 0 || eff === 0) {
      return { kgHrDeliv: 0, totalKgHr: 0, shiftKg: 0, shiftLb: 0, shiftBags: 0, dayKg: 0, dayLb: 0, dayBags: 0, actualDraft: 0 };
    }

    // Standard Textile Formulas:
    // Production (kg/hr/del) = (Delivery Speed [m/min] * 60 * Sliver Weight [g/m] / 1000) * (Eff% / 100)
    // Actual Draft = (Feed Sliver Weight [g/m] * Doublings) / Delivered Sliver Weight [g/m]
    const kgHrDeliv = (speed * 60 * delivWeight / 1000) * (eff / 100);
    const totalKgHr = kgHrDeliv * numDeliv * numMachines;
    const shiftKg = totalKgHr * 8;
    const shiftLb = shiftKg * 2.20462;
    const shiftBags = shiftLb / 100;

    const dayKg = shiftKg * 3;
    const dayLb = shiftLb * 3;
    const dayBags = shiftBags * 3;

    const actualDraft = (feedWeight > 0 && numDoublings > 0) ? (feedWeight * numDoublings) / delivWeight : 0;

    return {
      kgHrDeliv,
      totalKgHr,
      shiftKg,
      shiftLb,
      shiftBags,
      dayKg,
      dayLb,
      dayBags,
      actualDraft
    };
  };

  const prod = calculateProduction();
  const isHighSpeed = parseFloat(deliverySpeed) > 850;

  // Conversion reference grains/yd
  const grainsYd = (parseFloat(sliverWeight) || 0) * 14.17;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Column: Inputs */}
      <div className="w-full lg:w-5/12 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm">
        <h2 className="headline-md text-primary mb-6 flex items-center gap-2">
          <Sliders className="w-5 h-5 text-primary" aria-hidden="true" />
          Draw Frame Parameters & Speed
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
              label="Deliveries / Machine"
              unit="heads"
              type="number"
              value={deliveries}
              onChange={(e) => setDeliveries(e.target.value)}
            />
          </div>

          <InputField
            label="Delivery Speed"
            unit="m/min"
            type="number"
            value={deliverySpeed}
            onChange={(e) => setDeliverySpeed(e.target.value)}
            error={isHighSpeed ? "Warning: Speed exceeds recommended limit (850 m/min)" : undefined}
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

          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Feed Sliver Weight"
              unit="g/m"
              type="number"
              value={feedSliverWeight}
              onChange={(e) => setFeedSliverWeight(e.target.value)}
            />
            <InputField
              label="Doublings"
              unit="ends"
              type="number"
              value={doublings}
              onChange={(e) => setDoublings(e.target.value)}
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
          • Prod (kg/hr/del) = (Speed × 60 × Sliver g/m / 1000) × (Eff / 100)<br />
          • Actual Draft = (Feed Sliver g/m × Doublings) / Delivered Sliver g/m
        </div>
      </div>

      {/* Right Column: Outputs */}
      <div className="w-full lg:w-7/12 flex flex-col gap-4">
        {isHighSpeed && (
          <div className="bg-[#FFFBEB] border border-[#F59E0B] text-[#B45309] p-4 rounded-xl flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" aria-hidden="true" />
            <span className="body-md text-xs sm:text-sm">
              Delivery speed is elevated. Inspect autoleveller scanning discs and top roller cots to avoid drafting slippage.
            </span>
          </div>
        )}

        <CalculationCard
          title="Actual Drafting Ratio"
          value={
            <div className="flex items-baseline flex-wrap gap-2">
              <span className="text-secondary">{prod.actualDraft.toFixed(2)}</span>
              <span className="body-md text-on-surface-variant">actual draft</span>
            </div>
          }
          status={prod.actualDraft > 0 ? "success" : "default"}
        />

        <CalculationCard
          title="Production per Delivery Head"
          value={
            <div className="flex items-baseline flex-wrap gap-2">
              <span>{prod.kgHrDeliv.toFixed(2)}</span>
              <span className="body-md text-on-surface-variant">kg/hr/del</span>
              <span className="text-outline-variant mx-1">=</span>
              <span className="text-secondary">{(prod.kgHrDeliv * 2.20462).toFixed(2)}</span>
              <span className="body-md text-on-surface-variant">lbs/hr/del</span>
            </div>
          }
          status={prod.kgHrDeliv > 0 ? "success" : "default"}
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
