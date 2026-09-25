import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <span className="text-accent font-black tracking-widest text-sm uppercase mb-2">404 Exception</span>
      <h1 className="text-5xl font-black uppercase text-white mb-3">Set Not Found</h1>
      <p className="text-neutral-400 text-sm max-w-sm mb-6">The lift or route you requested does not exist in the current program.</p>
      <Link href="/" className="px-6 py-2.5 bg-accent text-darkBg font-black text-xs uppercase tracking-wider rounded">
        Return to Gym
      </Link>
    </div>
  );
}