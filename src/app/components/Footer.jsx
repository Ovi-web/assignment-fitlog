import Image from "next/image";
import logoImg from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-[#0a0c0e] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2 text-sm font-black tracking-wider text-white uppercase font-[Oswald]">
          <Image
            src={logoImg}
            alt="FitLog Logo"
            width={20}
            height={20}
            className="object-contain"
          />
          <span>FIT<span className="text-[#ccff00]">LOG</span></span>
        </div>

        <p className="text-xs text-neutral-500 text-center sm:text-right font-sans">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}