import Link from "next/link";
import React from "react";

const CALCULATORS = [
  { name: "Blow Room Calculator", path: "/blow-room", desc: "Calculate tuft weight and lap production." },
  { name: "Card Calculator", path: "/card", desc: "Carding production and draft calculations." },
  { name: "Drawing Calculator", path: "/drawing", desc: "Draw frame production and sliver weight." },
  { name: "Comber Calculator", path: "/comber", desc: "Noil percentage and combing production." },
  { name: "Simplex Calculator", path: "/simplex", desc: "Roving production and twist multiplier." },
  { name: "Ring Calculator", path: "/ring", desc: "Calculate spindle speed, production, and twist." },
  { name: "Auto Cone Calculator", path: "/auto-cone", desc: "Winding production and efficiency calculations." },
];

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-12 min-h-screen relative overflow-hidden">
      {/* Background decorations for a modern glassmorphic vibe */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 mb-12 text-center md:text-left pt-8">
        <h2 className="headline-lg text-transparent bg-clip-text bg-gradient-to-r from-primary via-tertiary to-secondary">Dashboard</h2>
        <p className="body-md text-on-surface-variant mt-2 max-w-xl md:mx-0 mx-auto">Select a calculation module to begin your spinning process computations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {CALCULATORS.map((calc) => (
          <Link href={calc.path} key={calc.path}>
            <div className="bg-surface-container/60 backdrop-blur-xl border border-outline-variant/30 rounded-2xl p-6 hover:border-primary/50 hover:bg-surface-variant/60 hover:shadow-[0_8px_30px_rgb(129,140,248,0.15)] hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full flex flex-col justify-between group">
              <div>
                <h3 className="headline-md text-on-surface group-hover:text-primary transition-colors">{calc.name}</h3>
                <p className="body-md text-on-surface-variant mt-3 leading-relaxed">{calc.desc}</p>
              </div>
              <div className="mt-8 flex items-center text-secondary font-medium text-sm">
                <span className="group-hover:translate-x-1 transition-transform">Open Module</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
