"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePlan } from "@/context/PlanContext";
import { 
  DumbbellIcon, 
  ClockIcon, 
  FlameIcon, 
  StarIcon, 
  CheckIcon, 
  CloseIcon, 
  ArrowUpDownIcon, 
  ChevronDownIcon 
} from "@/components/Icons";

export default function MyPlanPage() {
  const [tab, setTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");
  const { plan, saved, removeFromPlan, removeFromSaved, toggleDone } = usePlan();

  const activeList = tab === "plan" ? plan : saved;

  const totalMinutes = activeList.reduce((acc, item) => acc + (Number(item.duration) || 0), 0);
  const totalCalories = activeList.reduce((acc, item) => {
    const caloriesVal = item.caloriesBurned !== undefined ? item.caloriesBurned : item.calories;
    return acc + (Number(caloriesVal) || 0);
  }, 0);

  const sortedList = useMemo(() => {
    return [...activeList].sort((a, b) => {
      if (sortBy === "duration") {
        return (Number(b.duration) || 0) - (Number(a.duration) || 0);
      }
      if (sortBy === "calories") {
        const calA = Number(a.caloriesBurned !== undefined ? a.caloriesBurned : a.calories) || 0;
        const calB = Number(b.caloriesBurned !== undefined ? b.caloriesBurned : b.calories) || 0;
        return calB - calA;
      }
      if (sortBy === "rating") {
        return (Number(b.rating) || 0) - (Number(a.rating) || 0);
      }
      return 0;
    });
  }, [activeList, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-[Oswald]">
          My Plan
        </h1>
        <p className="text-neutral-400 text-xs sm:text-sm mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10 font-mono">
        <div className="p-4 sm:p-5 rounded-xl border border-neutral-800 bg-[#171a21]">
          <div className="text-[11px] sm:text-xs uppercase font-bold text-neutral-400">Exercises</div>
          <div className="text-2xl sm:text-3xl font-black text-white mt-1">
            {activeList.length} {tab === "plan" && <span className="text-xs text-neutral-500">/ 5</span>}
          </div>
        </div>
        <div className="p-4 sm:p-5 rounded-xl border border-neutral-800 bg-[#171a21]">
          <div className="text-[11px] sm:text-xs uppercase font-bold text-neutral-400">Minutes Total</div>
          <div className="text-2xl sm:text-3xl font-black text-[#ccff00] mt-1">
            {totalMinutes} <span className="text-xs text-neutral-400 font-normal">min</span>
          </div>
        </div>
        <div className="p-4 sm:p-5 rounded-xl border border-neutral-800 bg-[#171a21]">
          <div className="text-[11px] sm:text-xs uppercase font-bold text-neutral-400">Calories Burned</div>
          <div className="text-2xl sm:text-3xl font-black text-white mt-1">
            {totalCalories} <span className="text-xs text-neutral-400 font-normal">kcal</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800 mb-6 sm:mb-8 gap-3">
        <div className="flex font-mono">
          <button
            onClick={() => setTab("plan")}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 font-black text-xs uppercase tracking-wider transition cursor-pointer ${
              tab === "plan"
                ? "border-b-2 border-[#ccff00] text-[#ccff00]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan ({plan.length})
          </button>
          <button
            onClick={() => setTab("saved")}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 font-black text-xs uppercase tracking-wider transition cursor-pointer ${
              tab === "saved"
                ? "border-b-2 border-[#ccff00] text-[#ccff00]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Saved ({saved.length})
          </button>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 pb-2 sm:pb-0">
          <label htmlFor="sort" className="text-xs uppercase font-bold text-neutral-400 flex items-center gap-1.5">
            <ArrowUpDownIcon className="w-3.5 h-3.5 text-neutral-400" />
            Sort By:
          </label>
          <div className="relative inline-block">
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-[#171a21] border border-neutral-800 text-white text-xs font-bold uppercase rounded px-3 py-1.5 pr-8 hover:border-neutral-600 focus:outline-none focus:border-[#ccff00] cursor-pointer"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDownIcon className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      {sortedList.length === 0 ? (
        <div className="py-16 sm:py-20 text-center border border-dashed border-neutral-800 rounded-2xl p-6 sm:p-8 max-w-lg mx-auto">
          <DumbbellIcon className="w-8 h-8 text-neutral-600 mx-auto mb-3" />
          <h3 className="text-base sm:text-lg font-black uppercase text-white font-[Oswald]">Nothing Here Yet</h3>
          <p className="text-xs text-neutral-400 mt-1 mb-6">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="px-6 py-2.5 sm:py-3 bg-[#ccff00] text-black rounded font-black text-xs uppercase tracking-wider hover:opacity-90 inline-block transition"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {sortedList.map((item) => {
            const name = item.name || item.title;
            const image = item.image || item.illustration || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&q=80";
            const durationDisplay = item.duration ? `${item.duration}m` : "25m";
            const caloriesDisplay = item.caloriesBurned ? `${item.caloriesBurned}cal` : (item.calories ? `${item.calories}cal` : "180cal");

            return (
              <div
                key={item.id}
                className={`p-3.5 sm:p-4 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition ${
                  item.isDone ? "bg-emerald-950/20 border-emerald-800/40" : "bg-[#171a21] border-neutral-800"
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-neutral-900 flex-shrink-0">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <h4
                      className={`font-black uppercase text-xs sm:text-sm truncate font-[Oswald] ${
                        item.isDone ? "line-through text-neutral-400" : "text-white"
                      }`}
                    >
                      {name}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-neutral-400 flex items-center gap-1.5 mt-0.5 truncate">
                      <DumbbellIcon className="w-3 h-3 text-neutral-500 flex-shrink-0" />
                      <span className="truncate">{item.equipment || "Standard Gear"}</span>
                    </p>
                    <div className="flex items-center gap-2.5 sm:gap-3 mt-1.5 sm:mt-2 text-[10px] sm:text-[11px] text-neutral-300 font-semibold font-mono">
                      <span className="flex items-center gap-1">
                        <ClockIcon className="w-3 h-3 text-neutral-400" />
                        {durationDisplay}
                      </span>
                      <span className="flex items-center gap-1">
                        <FlameIcon className="w-3 h-3 text-[#ccff00]" />
                        {caloriesDisplay}
                      </span>
                      <span className="flex items-center gap-1">
                        <StarIcon className="w-3 h-3" />
                        {item.rating || "4.8"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-neutral-800/80">
                  <Link
                    href={`/workout/${item.id}`}
                    className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-neutral-700/60 bg-transparent text-neutral-300 text-[11px] sm:text-xs font-semibold hover:border-neutral-500 hover:text-white transition whitespace-nowrap"
                  >
                    View Details
                  </Link>

                  {tab === "plan" && (
                    <button
                      onClick={() => toggleDone(item.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold transition whitespace-nowrap cursor-pointer shadow-sm ${
                        item.isDone
                          ? "bg-emerald-600 text-white hover:bg-emerald-700"
                          : "bg-[#ccff00] text-black hover:brightness-110 active:scale-95"
                      }`}
                    >
                      <CheckIcon className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>{item.isDone ? "Done" : "Mark as Done"}</span>
                    </button>
                  )}

                  <button
                    onClick={() => (tab === "plan" ? removeFromPlan(item.id) : removeFromSaved(item.id))}
                    className="p-1.5 text-neutral-500 hover:text-rose-500 transition cursor-pointer"
                    title="Remove"
                  >
                    <CloseIcon className="w-4 h-4 stroke-[2]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}