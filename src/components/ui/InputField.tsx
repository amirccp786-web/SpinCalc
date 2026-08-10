"use client";

import React, { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  unit?: string;
  error?: string;
}

export function InputField({ label, unit, error, className, ...props }: InputFieldProps) {
  return (
    <div className={`flex flex-col gap-1 w-full ${className || ''}`}>
      <label className="label-md text-on-surface-variant flex justify-between">
        <span>{label}</span>
      </label>
      <div className="relative flex items-center">
        <input
          className={`
            w-full h-12 px-4 rounded-md bg-surface-container-highest text-on-surface 
            border focus:outline-none focus:ring-2 focus:ring-primary transition-colors
            ${error ? 'border-error focus:ring-error' : 'border-outline-variant'}
            ${unit ? 'pr-12' : ''}
          `}
          {...props}
        />
        {unit && (
          <span className="absolute right-4 text-on-surface-variant label-md pointer-events-none">
            {unit}
          </span>
        )}
      </div>
      {error && <span className="text-error text-xs">{error}</span>}
    </div>
  );
}
