import Banner from "@/components/Banner";
import Library from "@/components/Library";

async function getWorkouts() {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Failed to fetch workouts");
    const json = await res.json();
    return json.data || json;
  } catch (error) {
    console.error("API Fetch Error:", error);
    return [];
  }
}

export default async function HomePage() {
  const workouts = await getWorkouts();

  return (
    <div>
      <Banner />
      <Library workouts={workouts} />
    </div>
  );
}