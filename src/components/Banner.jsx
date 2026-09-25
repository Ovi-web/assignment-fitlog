import Image from "next/image";
import bannerImg from "@/assets/banner.png";
import { FlameIcon, ArrowDownIcon } from "@/components/Icons";

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#12151c] via-[#0d0f12] to-[#0d0f12] border-b border-neutral-800 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/90 text-xs font-bold uppercase tracking-widest text-[#ccff00]">
            <FlameIcon className="w-3.5 h-3.5 text-[#ccff00]" />
            <span>WORKOUT LIBRARY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-tight font-[Oswald]">
            TRAIN WITH INTENT. <br />
            <span className="text-white">LOG EVERY SET.</span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 max-w-xl leading-relaxed font-sans">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <div className="pt-2">
            <a
              href="#library"
              className="inline-flex items-center gap-3 px-8 py-4 rounded bg-[#ccff00] text-black font-black uppercase tracking-wider text-sm hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#ccff00]/10 cursor-pointer font-sans"
            >
              <span>BROWSE WORKOUTS</span>
              <ArrowDownIcon className="w-4 h-4 text-black" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center items-center relative">
          <div className="relative w-full max-w-md aspect-square flex items-center justify-center p-4">
            <Image
              src={bannerImg}
              alt="Workout Machine Banner"
              width={460}
              height={460}
              priority
              className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] filter contrast-105"
            />
          </div>
        </div>

      </div>
    </section>
  );
}