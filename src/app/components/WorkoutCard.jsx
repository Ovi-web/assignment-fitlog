import Link from "next/link";
import Image from "next/image";
import { ClockIcon, FlameIcon } from "@/components/Icons";

export default function WorkoutCard({ workout }) {
  const name = workout.name || workout.title || "Workout";
  const image = workout.image || workout.illustration || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=80";
  const duration = workout.duration ? `${workout.duration} min` : "25 min";
  const calories = workout.caloriesBurned 
    ? `${workout.caloriesBurned} kcal` 
    : (workout.calories ? `${workout.calories} kcal` : "180 kcal");
  const rating = workout.rating || "4.8";
  const equipment = workout.equipment || "Standard Equipment";
  const categories = workout.muscleGroups || workout.category || ["General"];
  const categoryList = Array.isArray(categories) ? categories : [categories];

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col rounded-2xl border border-neutral-800/80 bg-[#12151b] hover:border-neutral-700 transition duration-200 overflow-hidden shadow-lg"
    >
      <div className="relative aspect-[16/10] w-full bg-neutral-900 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition duration-300"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div>
          <div className="flex flex-wrap gap-2 mb-3.5">
            {categoryList.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider rounded-full bg-[#ccff00] text-black"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-base sm:text-lg font-black tracking-tight text-white uppercase group-hover:text-[#ccff00] transition line-clamp-1 font-[Oswald]">
            {name}
          </h3>

          <p className="text-xs text-neutral-400 mt-1 truncate font-sans">
            {equipment}
          </p>
        </div>

        <div className="pt-4 border-t border-neutral-800/80 flex items-center gap-5 text-xs text-neutral-400 font-mono">
          <div className="flex items-center gap-1.5">
            <ClockIcon className="w-3.5 h-3.5 text-neutral-400" />
            <span>{duration}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <FlameIcon className="w-3.5 h-3.5 text-neutral-400" />
            <span>{calories}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 stroke-neutral-400 fill-none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span>{rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}