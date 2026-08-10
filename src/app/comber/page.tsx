"use client";

import React, { useState } from "react";
import { InputField } from "@/components/ui/InputField";
import { CalculationCard } from "@/components/ui/CalculationCard";

export default function ComberCalculator() {
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
    // Same as card: Speed(m/min) * 60 * 8 * Eff/100 * Weight(grains/yd) * 1.0936 / 7000
    // Then apply noil deduction
    const prodLb = (speed * 60 * 8 * (eff / 100) * weight * 1.0936 * (1 - (noil / 100))) / 7000;
    return prodLb * numMachines * heads;
  };

  const rawProdLb = calculateProduction();
  const prodLb = rawProdLb.toFixed(2);
  const prodBags = (rawProdLb / 100).toFixed(2);
  
  const rawProdDayLb = rawProdLb * 3;
  const prodDayLb = rawProdDayLb.toFixed(2);
  const prodDayBags = (rawProdDayLb / 100).toFixed(2);

  const isHighSpeed = parseFloat(nipsPerMin) > 500;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-12 flex flex-col lg:flex-row gap-8">
      {/* Left Column: Inputs */}
      <div className="w-full lg:w-5/12 bg-surface-container-lowest p-6 rounded-lg border border-outline-variant">
        <h2 className="headline-md text-primary mb-6">Comber Calculator</h2>
        
        <form className="flex flex-col gap-4">
          <InputField 
            label="Machines" 
            unit="qty" 
            type="number"
            value={machines}
            onChange={(e) => setMachines(e.target.value)}
          />
          <InputField 
            label="No. of Heads" 
            unit="per machine" 
            type="number"
            value={noOfHeads}
            onChange={(e) => setNoOfHeads(e.target.value)}
          />
          <InputField 
            label="Nips per Minute" 
            unit="Nips" 
            type="number"
            value={nipsPerMin}
            onChange={(e) => setNipsPerMin(e.target.value)}
            error={isHighSpeed ? "Warning: Speed exceeds recommended limit" : undefined}
          />
          <InputField 
            label="Feed per Nip" 
            unit="mm" 
            type="number"
            value={feedPerNip}
            onChange={(e) => setFeedPerNip(e.target.value)}
          />
          <InputField 
            label="Lap Weight" 
            unit="grains/yd" 
            type="number"
            value={lapWeight}
            onChange={(e) => setLapWeight(e.target.value)}
          />
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
            <span className="body-md">Nips per minute is extremely high. High risk of fiber damage.</span>
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
