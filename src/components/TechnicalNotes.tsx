import React from "react";

export interface FormulaItem {
  name: string;
  formula: string;
  notes?: string;
}

export interface VariableDef {
  symbol: string;
  name: string;
  description: string;
  typicalRange?: string;
}

export interface MillBenchmark {
  title: string;
  region: string;
  observation: string;
}

interface TechnicalNotesProps {
  departmentTitle: string;
  formulas: FormulaItem[];
  variables: VariableDef[];
  benchmarks: MillBenchmark[];
  technicalOverview: string;
}

export function TechnicalNotes({
  departmentTitle,
  formulas,
  variables,
  benchmarks,
  technicalOverview,
}: TechnicalNotesProps) {
  return (
    <section
      aria-labelledby="technical-formulas-heading"
      className="mt-12 bg-surface-container-lowest/90 border border-outline-variant/40 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-xl"
    >
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-outline-variant/30">
        <span className="material-symbols-outlined text-secondary text-2xl">
          functions
        </span>
        <div>
          <h2
            id="technical-formulas-heading"
            className="headline-md text-on-surface tracking-tight"
          >
            {departmentTitle} — Technical Formulas & Engineering Notes
          </h2>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Standard textile engineering equations, unit balances & South Asian mill-floor benchmarks
          </p>
        </div>
      </div>

      {/* Technical Overview Description */}
      <div className="mb-8 text-on-surface-variant body-md leading-relaxed">
        <p>{technicalOverview}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Core Mathematical Equations */}
        <div className="flex flex-col gap-4">
          <h3 className="label-md uppercase tracking-wider text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">calculate</span>
            Standard Mathematical Formulas
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
                <code className="text-sm md:text-base font-jetbrains bg-surface-container-highest/50 p-2.5 rounded-lg text-on-surface block overflow-x-auto whitespace-pre-wrap">
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

        {/* Variables & Constants Definitions */}
        <div className="flex flex-col gap-4">
          <h3 className="label-md uppercase tracking-wider text-tertiary flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">menu_book</span>
            Key Variables & Engineering Constants
          </h3>
          <div className="bg-surface-container-low/80 border border-outline-variant/30 rounded-xl divide-y divide-outline-variant/20 overflow-hidden">
            {variables.map((v, idx) => (
              <div key={idx} className="p-3.5 flex flex-col gap-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-xs font-jetbrains font-bold text-primary">
                    {v.symbol} ({v.name})
                  </span>
                  {v.typicalRange && (
                    <span className="text-[11px] font-jetbrains text-secondary bg-secondary-container/20 px-2 py-0.5 rounded">
                      {v.typicalRange}
                    </span>
                  )}
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Practical Mill Floor Benchmarks */}
      <div className="pt-6 border-t border-outline-variant/30">
        <h3 className="label-md uppercase tracking-wider text-secondary mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">factory</span>
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
    </section>
  );
}
