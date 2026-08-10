import React from 'react';

interface CalculationCardProps {
  title: string;
  value: React.ReactNode;
  unit?: React.ReactNode;
  subValue?: React.ReactNode;
  subUnit?: React.ReactNode;
  status?: 'default' | 'success' | 'warning' | 'error';
}

export function CalculationCard({ title, value, unit, subValue, subUnit, status = 'default' }: CalculationCardProps) {
  
  let bgClass = 'bg-surface-container-low';
  let borderClass = 'border-outline-variant';
  
  if (status === 'success') {
    bgClass = 'bg-[#F0FDFA] text-teal-900'; // Light Precision Teal
    borderClass = 'border-tertiary-container';
  } else if (status === 'error') {
    bgClass = 'bg-error-container text-error';
    borderClass = 'border-error';
  } else if (status === 'warning') {
    bgClass = 'bg-[#FFFBEB] text-amber-900'; // Amber light
    borderClass = 'border-[#F59E0B]';
  }

  return (
    <div className={`p-6 rounded-lg border ${bgClass} ${borderClass} flex flex-col gap-2`}>
      <h3 className="label-md text-on-surface-variant uppercase tracking-wider">{title}</h3>
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-2">
          <span className="data-display text-primary">{value}</span>
          {unit && <span className="body-md text-on-surface-variant">{unit}</span>}
        </div>
        {subValue !== undefined && (
          <div className="flex items-baseline gap-2">
            <span className="data-display text-secondary text-[20px]">{subValue}</span>
            {subUnit && <span className="body-md text-on-surface-variant">{subUnit}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
