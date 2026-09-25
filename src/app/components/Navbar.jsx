"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import logoImg from "@/assets/logo.png";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active status check
  const isWorkoutActive = pathname === "/" || pathname.startsWith("/workout");
  const isMyPlanActive = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-50 bg-[#0d0f12]/95 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-neutral-300 hover:text-white focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>

          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5">
            <div className="relative w-7 h-7 flex items-center justify-center">
              <Image
                src={logoImg}
                alt="FitLog Logo"
                width={28}
                height={28}
                priority
                className="object-contain"
              />
            </div>
            <span className="text-xl font-black tracking-wider text-white uppercase font-[Oswald]">
              FIT<span className="text-[#ccff00]">LOG</span>
            </span>
          </Link>
        </div>

        
        <nav className="hidden md:flex items-center gap-2 text-sm font-medium">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full transition duration-150 ${
              isWorkoutActive
                ? "bg-[#ccff00]/15 text-[#ccff00] font-bold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-4 py-1.5 rounded-full transition duration-150 ${
              isMyPlanActive
                ? "bg-[#ccff00]/15 text-[#ccff00] font-bold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right: Badges */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase rounded-full bg-[#ccff00] text-black hover:opacity-90 transition font-mono"
          >
            <span>Plan</span>
            <span className="bg-black/15 text-black px-1.5 py-0.5 rounded-full font-black text-[11px]">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase rounded-full border border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:text-white transition font-mono"
          >
            <span>Saved</span>
            <span className="border border-neutral-700 bg-neutral-800/60 px-1.5 py-0.5 rounded-full text-neutral-300 text-[11px]">
              {saved.length}
            </span>
          </Link>
        </div>

      </div>

   
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-4 right-4 sm:right-auto sm:w-56 rounded-2xl bg-[#12151b] border border-neutral-800 shadow-2xl py-3 px-2 flex flex-col space-y-1.5 z-50">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition ${
              isWorkoutActive
                ? "bg-[#ccff00]/15 text-[#ccff00] font-bold"
                : "text-neutral-300 hover:bg-neutral-800 hover:text-white font-medium"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition ${
              isMyPlanActive
                ? "bg-[#ccff00]/15 text-[#ccff00] font-bold"
                : "text-neutral-300 hover:bg-neutral-800 hover:text-white font-medium"
            }`}
          >
            My Plan
          </Link>
        </div>
      )}
    </header>
  );
}