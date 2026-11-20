import Link from "next/link";
import React from "react";
import {
  Wind,
  Layers,
  Ruler,
  Filter,
  RotateCw,
  RefreshCw,
  Package,
  ArrowLeft,
  ArrowRight,
  GitFork,
  Grid3X3,
  LucideIcon
} from "lucide-react";

export interface ProcessStep {
  name: string;
  path: string;
  desc: string;
  stage: string;
  icon: LucideIcon;
  outputUnit: string;
}

export const SPINNING_PROCESS_STEPS: ProcessStep[] = [
  {
    name: "Blow Room",
    path: "/blow-room",
    desc: "Bale opening, cleaning, tuft formation & lap production calculations.",
    stage: "Stage 1",
    icon: Wind,
    outputUnit: "kg/hr | g/m"
  },
  {
    name: "Carding Machine",
    path: "/card",
    desc: "Carding production rate, total draft, sliver linear density & waste.",
    stage: "Stage 2",
    icon: Layers,
    outputUnit: "m/min | g/m"
  },
  {
    name: "Draw Frame",
    path: "/drawing",
    desc: "Breaker & finisher delivery speed, autolevelling & doubling draft.",
    stage: "Stage 3",
    icon: Ruler,
    outputUnit: "kg/hr/del | Draft"
  },
  {
    name: "Comber",
    path: "/comber",
    desc: "Combing nip frequency, feed/nip, and noil extraction percentage.",
    stage: "Stage 4 (Combed)",
    icon: Filter,
    outputUnit: "nips/min | Noil %"
  },
  {
    name: "Simplex (Speed Frame)",
    path: "/simplex",
    desc: "Roving hank (Ne), flyer delivery speed, spindle RPM, and TPI.",
    stage: "Stage 5",
    icon: RotateCw,
    outputUnit: "kg/sp-hr | TPI"
  },
  {
    name: "Ring Frame",
    path: "/ring",
    desc: "Spindle RPM, TPI, yarn count Ne, g/spindle/shift, and OPS.",
    stage: "Stage 6",
    icon: RefreshCw,
    outputUnit: "g/sp-shift | OPS"
  },
  {
    name: "Auto Cone (Winding)",
    path: "/auto-cone",
    desc: "Winding speed, drum efficiency, and production in kg/drum/hr.",
    stage: "Stage 7",
    icon: Package,
    outputUnit: "kg/drum/hr | Cones"
  }
];

interface SpinningProcessNavProps {
  currentRoute: string;
}

export function SpinningProcessNav({ currentRoute }: SpinningProcessNavProps) {
  const currentIndex = SPINNING_PROCESS_STEPS.findIndex(
    (step) => step.path === currentRoute
  );
  const prevStep = currentIndex > 0 ? SPINNING_PROCESS_STEPS[currentIndex - 1] : null;
  const nextStep =
    currentIndex >= 0 && currentIndex < SPINNING_PROCESS_STEPS.length - 1
      ? SPINNING_PROCESS_STEPS[currentIndex + 1]
      : null;

  return (
    <nav
      aria-label="Spinning Process Flow and Related Calculators"
      className="mt-12 pt-8 border-t border-outline-variant/30 flex flex-col gap-8"
    >
      {/* Sequential Next / Previous Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevStep ? (
          <Link
            href={prevStep.path}
            className="w-full sm:w-auto flex items-center gap-3 p-3 px-5 rounded-lg border border-outline-variant/40 bg-surface-container/60 hover:bg-surface-variant hover:border-primary/40 transition-all text-on-surface group cursor-pointer"
            title={`Previous Process: ${prevStep.name}`}
          >
            <ArrowLeft className="w-5 h-5 text-secondary group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            <div className="text-left">
              <span className="text-xs uppercase tracking-wider text-on-surface-variant block">
                Previous Stage ({prevStep.stage})
              </span>
              <span className="text-sm font-semibold group-hover:text-primary transition-colors">
                {prevStep.name} Calculator
              </span>
            </div>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}

        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Grid3X3 className="w-4 h-4" aria-hidden="true" />
          All Mill Modules
        </Link>

        {nextStep && (
          <Link
            href={nextStep.path}
            className="w-full sm:w-auto flex items-center justify-end gap-3 p-3 px-5 rounded-lg border border-outline-variant/40 bg-surface-container/60 hover:bg-surface-variant hover:border-primary/40 transition-all text-on-surface group cursor-pointer"
            title={`Next Process: ${nextStep.name}`}
          >
            <div className="text-right">
              <span className="text-xs uppercase tracking-wider text-on-surface-variant block">
                Next Stage ({nextStep.stage})
              </span>
              <span className="text-sm font-semibold group-hover:text-primary transition-colors">
                {nextStep.name} Calculator
              </span>
            </div>
            <ArrowRight className="w-5 h-5 text-secondary group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        )}
      </div>

      {/* Full Process Stepper / Flow Bar */}
      <div className="bg-surface-container-low/70 border border-outline-variant/30 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="headline-md text-on-surface text-base md:text-lg flex items-center gap-2">
            <GitFork className="w-5 h-5 text-primary" aria-hidden="true" />
            Sequential Spinning Mill Process Flow
          </h2>
          <span className="text-xs text-on-surface-variant font-jetbrains hidden md:inline">
            Stage {currentIndex + 1} of {SPINNING_PROCESS_STEPS.length}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {SPINNING_PROCESS_STEPS.map((step, idx) => {
            const isActive = step.path === currentRoute;
            const StepIcon = step.icon;
            return (
              <Link
                key={step.path}
                href={step.path}
                className={`flex flex-col p-2.5 rounded-lg border transition-all text-left cursor-pointer ${
                  isActive
                    ? "bg-primary-container/20 border-primary text-primary font-semibold shadow-sm"
                    : "bg-surface-container-highest/20 border-outline-variant/30 hover:border-outline-variant hover:bg-surface-container-highest/40 text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="opacity-70 font-jetbrains">0{idx + 1}</span>
                  <StepIcon className="w-3.5 h-3.5 opacity-80" aria-hidden="true" />
                </div>
                <span className="text-xs leading-snug line-clamp-1">{step.name}</span>
                <span className="text-[10px] opacity-60 font-jetbrains mt-0.5 line-clamp-1">
                  {step.outputUnit}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
