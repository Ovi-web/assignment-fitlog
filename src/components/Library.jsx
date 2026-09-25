import WorkoutCard from "./WorkoutCard";

export default function Library({ workouts = [] }) {
  return (
    <section id="library" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10 pb-6 border-b border-neutral-800">
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white font-[Oswald]">
          The Library
        </h2>
        <p className="text-sm text-neutral-400 mt-1">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  );
}