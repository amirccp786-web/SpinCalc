import React from "react";
import { BookOpen, Calculator, Variable, CheckCircle2, Factory, Sparkles } from "lucide-react";

export interface FormulaItem {
  name: string;
  formula: string;
  notes?: string;
}

export interface VariableDef {
  symbol: string;
  name: string;
  unit: string;
  description: string;
  typicalRange?: string;
}

export interface CalculationStep {
  stepTitle: string;
  formulaStr: string;
  calculationStr: string;
  resultStr: string;
}

export interface WorkedExample {
  title: string;
  scenario: string;
  givenInputs: { label: string; value: string }[];
  steps: CalculationStep[];
  finalResult: string;
}

export interface MillBenchmark {
  title: string;
  region: string;
  observation: string;
}

interface TechnicalNotesProps {
  departmentTitle: string;
  processDefinition: string;
  formulas: FormulaItem[];
  variables: VariableDef[];
  workedExample: WorkedExample;
  benchmarks?: MillBenchmark[];
}

export function TechnicalNotes({
  departmentTitle,
  processDefinition,
  formulas,
  variables,
  workedExample,
  benchmarks,
}: TechnicalNotesProps) {
  return (
    <section
      aria-labelledby="technical-reference-heading"
      className="mt-12 bg-surface-container-lowest/90 border border-outline-variant/40 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-xl"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-outline-variant/30">
        <BookOpen className="w-6 h-6 text-secondary" aria-hidden="true" />
        <div>
          <h2
            id="technical-reference-heading"
            className="headline-md text-on-surface tracking-tight"
          >
            {departmentTitle} — Technical Formulas, Key & Worked Example
          </h2>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Standard textile mathematical equations, unit definitions, and mill-floor verification guide
          </p>
        </div>
      </div>

      {/* 1. Process Definition (2-3 sentences) */}
      <div className="mb-8 bg-surface-container-low/70 border border-outline-variant/30 rounded-xl p-5">
        <h3 className="label-md uppercase tracking-wider text-primary mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
          Process Definition & Mill Importance
        </h3>
        <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
          {processDefinition}
        </p>
      </div>

      {/* 2. Formulas & Variable Key Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Exact Standard Formulas */}
        <div className="flex flex-col gap-4">
          <h3 className="label-md uppercase tracking-wider text-secondary flex items-center gap-2">
            <Calculator className="w-4 h-4 text-secondary" aria-hidden="true" />
            Standard Textile Mathematical Formulas
          </h3>
          <div className="flex flex-col gap-3">
            {formulas.map((item, idx) => (
              <div
                key={idx}
                className="bg-surface-container-low/80 border border-outline-variant/30 rounded-xl p-4 flex flex-col gap-2"
              >
                <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                  {item.name}
                </span>
                <code className="text-sm md:text-base font-jetbrains bg-surface-container-highest/60 p-3 rounded-lg text-on-surface block overflow-x-auto whitespace-pre-wrap">
                  {item.formula}
                </code>
                {item.notes && (
                  <span className="text-xs text-on-surface-variant leading-relaxed">
                    {item.notes}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Variable & Units Key */}
        <div className="flex flex-col gap-4">
          <h3 className="label-md uppercase tracking-wider text-tertiary flex items-center gap-2">
            <Variable className="w-4 h-4 text-tertiary" aria-hidden="true" />
            Variable Key & Unit Definitions
          </h3>
          <div className="bg-surface-container-low/80 border border-outline-variant/30 rounded-xl divide-y divide-outline-variant/20 overflow-hidden">
            {variables.map((v, idx) => (
              <div key={idx} className="p-3.5 flex flex-col gap-1">
                <div className="flex items-baseline justify-between gap-2 flex-wrap">
                  <span className="text-xs font-jetbrains font-bold text-primary">
                    {v.symbol} — {v.name}
                  </span>
                  <span className="text-[11px] font-jetbrains text-secondary bg-secondary-container/20 px-2 py-0.5 rounded">
                    Unit: {v.unit}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {v.description}
                </p>
                {v.typicalRange && (
                  <span className="text-[10px] text-tertiary font-jetbrains mt-0.5">
                    Typical Mill Range: {v.typicalRange}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Step-by-Step Worked Example with Realistic Mill Values */}
      <div className="mb-8 bg-surface-container-low/80 border border-outline-variant/30 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2 pb-3 border-b border-outline-variant/20">
          <h3 className="label-md uppercase tracking-wider text-primary flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-teal-400" aria-hidden="true" />
            Worked Mill Calculation Example: {workedExample.title}
          </h3>
          <span className="text-xs font-jetbrains bg-teal-500/10 border border-teal-500/20 text-teal-300 px-3 py-1 rounded-full">
            Realistic Mill Verification
          </span>
        </div>

        <p className="text-xs md:text-sm text-on-surface-variant mb-4 leading-relaxed">
          {workedExample.scenario}
        </p>

        {/* Given Inputs */}
        <div className="mb-5 bg-surface-container-highest/40 rounded-xl p-4 border border-outline-variant/20">
          <span className="text-xs font-semibold uppercase tracking-wider text-secondary block mb-2 font-jetbrains">
            Given Production Parameters:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {workedExample.givenInputs.map((input, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[11px] text-on-surface-variant">{input.label}</span>
                <span className="text-xs font-jetbrains font-bold text-on-surface">{input.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-3 mb-4">
          {workedExample.steps.map((step, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-surface-container-highest/30 border border-outline-variant/20 flex flex-col gap-1.5"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-[11px] font-bold flex items-center justify-center font-jetbrains">
                  {idx + 1}
                </span>
                <span className="text-xs font-semibold text-on-surface">
                  {step.stepTitle}
                </span>
              </div>
              <div className="font-jetbrains text-xs text-on-surface-variant pl-7">
                <code>{step.formulaStr}</code>
              </div>
              <div className="font-jetbrains text-xs text-secondary pl-7">
                <code>= {step.calculationStr}</code>
              </div>
              <div className="font-jetbrains text-xs font-bold text-teal-400 pl-7">
                = {step.resultStr}
              </div>
            </div>
          ))}
        </div>

        {/* Final Result Highlight */}
        <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-semibold text-teal-200">
            Calculated Output:
          </span>
          <span className="text-sm md:text-base font-jetbrains font-bold text-teal-300">
            {workedExample.finalResult}
          </span>
        </div>
      </div>

      {/* 4. Practical Mill Floor Benchmarks */}
      {benchmarks && benchmarks.length > 0 && (
        <div className="pt-6 border-t border-outline-variant/30">
          <h3 className="label-md uppercase tracking-wider text-secondary mb-4 flex items-center gap-2">
            <Factory className="w-4 h-4 text-secondary" aria-hidden="true" />
            Practical Mill-Floor Benchmarks (Pakistan, India & Bangladesh)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {benchmarks.map((b, idx) => (
              <div
                key={idx}
                className="bg-surface-container-low/60 border border-outline-variant/20 rounded-xl p-4 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-on-surface">
                    {b.title}
                  </span>
                  <span className="text-[10px] uppercase font-jetbrains text-primary bg-primary-container/20 px-2 py-0.5 rounded">
                    {b.region}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {b.observation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
