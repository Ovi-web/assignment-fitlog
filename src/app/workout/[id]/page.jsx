"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import Link from "next/link";

export default function WorkoutDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToPlan, addToSaved, plan } = usePlan();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
        if (!res.ok) throw new Error("Could not find workout");
        const json = await res.json();
        setWorkout(json.data || json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#ccff00] border-r-transparent" />
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="max-w-xl mx-auto py-24 px-4 text-center">
        <h2 className="text-2xl font-black uppercase text-white mb-4">Workout Not Found</h2>
        <Link href="/" className="px-6 py-2 bg-[#ccff00] text-black font-bold uppercase rounded">
          Back to Library
        </Link>
      </div>
    );
  }

  const name = workout.name || workout.title;
  const description = workout.description || "A compound press that builds chest thickness, triceps, and pressing power from a stable bench.";
  const image = workout.image || workout.illustration || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80";
  const instructions = workout.instructions || [
    "Lie on the bench with eyes under the bar and feet planted.",
    "Unrack with locked elbows and lower the bar to mid-chest.",
    "Press up in a slight arc until elbows lock without bouncing.",
    "Keep shoulder blades pinched and a natural arch in the back."
  ];

  const durationVal = workout.duration ? `${workout.duration} min` : "25 min";
  const caloriesVal = workout.caloriesBurned 
    ? `${workout.caloriesBurned} kcal` 
    : (workout.calories ? `${workout.calories} kcal` : "180 kcal");
  const categories = workout.muscleGroups || workout.category || ["Chest", "Arms"];
  const categoryList = Array.isArray(categories) ? categories : [categories];
  const isPlanCapped = plan.length >= 5;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        <div className="lg:col-span-6 w-full">
          <div className="rounded-2xl overflow-hidden bg-[#12151b] border border-neutral-800/60 shadow-2xl relative w-full aspect-[4/3] lg:aspect-square">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight font-[Oswald]">
              {name}
            </h1>
            <p className="text-neutral-400 text-sm mt-3 leading-relaxed font-sans max-w-xl">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {categoryList.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-bold uppercase rounded-full bg-[#ccff00] text-black"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="rounded-xl bg-[#12151b]/90 border border-neutral-800/80 p-5 divide-y divide-neutral-800/60 font-sans text-xs">
            <div className="flex justify-between py-2.5">
              <span className="text-neutral-400 font-bold uppercase tracking-wider">EQUIPMENT</span>
              <span className="text-neutral-100 font-medium">{workout.equipment || "Barbell, Bench"}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-neutral-400 font-bold uppercase tracking-wider">DIFFICULTY</span>
              <span className="text-neutral-100 font-medium">{workout.difficulty || "Intermediate"}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-neutral-400 font-bold uppercase tracking-wider">SETS</span>
              <span className="text-neutral-100 font-medium">{workout.sets || 4}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-neutral-400 font-bold uppercase tracking-wider">REPS</span>
              <span className="text-neutral-100 font-medium">{workout.reps || "6-8"}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-neutral-400 font-bold uppercase tracking-wider">DURATION</span>
              <span className="text-neutral-100 font-medium">{durationVal}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-neutral-400 font-bold uppercase tracking-wider">CALORIES</span>
              <span className="text-neutral-100 font-medium">{caloriesVal}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-neutral-400 font-bold uppercase tracking-wider">RATING</span>
              <span className="text-neutral-100 font-medium">{workout.rating || "4.8"}</span>
            </div>
          </div>

          <div className="pt-2">
            <h3 className="text-sm font-black uppercase tracking-wider text-white mb-3 font-[Oswald]">
              INSTRUCTIONS
            </h3>
            <ol className="space-y-2.5 text-xs text-neutral-300 leading-relaxed font-sans">
              {instructions.map((step, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-neutral-400 font-medium">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              onClick={() => addToPlan(workout)}
              disabled={isPlanCapped}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition ${
                isPlanCapped
                  ? "bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700"
                  : "bg-[#ccff00] text-black hover:brightness-110 active:scale-95 cursor-pointer shadow-sm"
              }`}
            >
              <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <line x1="12" y1="14" x2="12" y2="18" />
                <line x1="10" y1="16" x2="14" y2="16" />
              </svg>
              <span>{isPlanCapped ? "Plan Full (Cap 5)" : "Add to today's plan"}</span>
            </button>

            <button
              onClick={() => addToSaved(workout)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider border border-neutral-700 bg-transparent text-neutral-200 hover:border-neutral-500 hover:text-white transition active:scale-95 cursor-pointer"
            >
              <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              <span>Save for later</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}