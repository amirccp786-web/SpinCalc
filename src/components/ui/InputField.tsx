"use client";

import React, { InputHTMLAttributes, useId } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  unit?: string;
  error?: string;
}

export function InputField({ label, unit, error, className, id, ...props }: InputFieldProps) {
  const defaultId = useId();
  const inputId = id || `input-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${defaultId.replace(/[:]/g, '')}`;

  return (
    <div className={`flex flex-col gap-1 w-full ${className || ''}`}>
      <label htmlFor={inputId} className="label-md text-on-surface-variant flex justify-between cursor-pointer">
        <span>{label}</span>
      </label>
      <div className="relative flex items-center">
        <input
          id={inputId}
          aria-label={props['aria-label'] || (unit ? `${label} in ${unit}` : label)}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`
            w-full h-12 px-4 rounded-md bg-surface-container-highest text-on-surface 
            border focus:outline-none focus:ring-2 focus:ring-primary transition-colors
            ${error ? 'border-error focus:ring-error' : 'border-outline-variant'}
            ${unit ? 'pr-12' : ''}
          `}
          {...props}
        />
        {unit && (
          <span className="absolute right-4 text-on-surface-variant label-md pointer-events-none" aria-hidden="true">
            {unit}
          </span>
        )}
      </div>
      {error && (
        <span id={`${inputId}-error`} className="text-error text-xs" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
