import Link from "next/link";
import React from "react";

export interface ProcessStep {
  name: string;
  path: string;
  desc: string;
  stage: string;
  icon: string;
  outputUnit: string;
}

export const SPINNING_PROCESS_STEPS: ProcessStep[] = [
  {
    name: "Blow Room",
    path: "/blow-room",
    desc: "Bale opening, cleaning, tuft formation & lap production calculations.",
    stage: "Stage 1",
    icon: "air",
    outputUnit: "kg/hr | Lap oz/yd"
  },
  {
    name: "Carding Machine",
    path: "/card",
    desc: "Carding production rate, draft, sliver hank & waste percentage.",
    stage: "Stage 2",
    icon: "view_stream",
    outputUnit: "m/min | grains/yd"
  },
  {
    name: "Draw Frame",
    path: "/drawing",
    desc: "Breaker & finisher delivery speed, autolevelling & doubling calculations.",
    stage: "Stage 3",
    icon: "linear_scale",
    outputUnit: "m/min | bags/shift"
  },
  {
    name: "Comber",
    path: "/comber",
    desc: "Combing nip frequency, feed/nip, and noil extraction percentage.",
    stage: "Stage 4 (Combed)",
    icon: "filter_list",
    outputUnit: "nips/min | Noil %"
  },
  {
    name: "Simplex (Speed Frame)",
    path: "/simplex",
    desc: "Roving hank (Ne), flyer spindle speed (RPM), and roving twist multiplier.",
    stage: "Stage 5",
    icon: "cyclone",
    outputUnit: "RPM | Roving Ne"
  },
  {
    name: "Ring Frame",
    path: "/ring",
    desc: "Spindle speed (RPM), TPI, yarn count Ne, OPS, and production in 100-lb bags.",
    stage: "Stage 6",
    icon: "autorenew",
    outputUnit: "Spindle RPM | Bags/day"
  },
  {
    name: "Auto Cone (Winding)",
    path: "/auto-cone",
    desc: "Cone winding speed, package efficiency, clearer cuts & production in kg.",
    stage: "Stage 7",
    icon: "inventory_2",
    outputUnit: "m/min | Cones/shift"
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
            className="w-full sm:w-auto flex items-center gap-3 p-3 px-5 rounded-lg border border-outline-variant/40 bg-surface-container/60 hover:bg-surface-variant hover:border-primary/40 transition-all text-on-surface group"
            title={`Previous Process: ${prevStep.name}`}
          >
            <span className="material-symbols-outlined text-secondary group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
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
          className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[18px]">grid_view</span>
          All Mill Modules
        </Link>

        {nextStep && (
          <Link
            href={nextStep.path}
            className="w-full sm:w-auto flex items-center justify-end gap-3 p-3 px-5 rounded-lg border border-outline-variant/40 bg-surface-container/60 hover:bg-surface-variant hover:border-primary/40 transition-all text-on-surface group"
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
            <span className="material-symbols-outlined text-secondary group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        )}
      </div>

      {/* Full Process Stepper / Flow Bar */}
      <div className="bg-surface-container-low/70 border border-outline-variant/30 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="headline-md text-on-surface text-base md:text-lg flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">
              account_tree
            </span>
            Sequential Spinning Mill Process Flow
          </h2>
          <span className="text-xs text-on-surface-variant font-jetbrains hidden md:inline">
            Stage {currentIndex + 1} of {SPINNING_PROCESS_STEPS.length}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {SPINNING_PROCESS_STEPS.map((step, idx) => {
            const isActive = step.path === currentRoute;
            return (
              <Link
                key={step.path}
                href={step.path}
                className={`flex flex-col p-2.5 rounded-lg border transition-all text-left ${
                  isActive
                    ? "bg-primary-container/20 border-primary text-primary font-semibold shadow-sm"
                    : "bg-surface-container-highest/20 border-outline-variant/30 hover:border-outline-variant hover:bg-surface-container-highest/40 text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="opacity-70 font-jetbrains">0{idx + 1}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
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
