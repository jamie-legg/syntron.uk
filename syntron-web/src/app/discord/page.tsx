"use client";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import AnimatedGradient from "../components/AnimatedGradient";

export default function DiscordPage() {
  const router = useRouter();
  if (typeof window !== "undefined") {
    window.location.href = "https://discord.gg/dcpaauj";
  } else {
    router.replace("https://discord.gg/dcpaauj");
  }
  return (
    <div className="w-screen h-screen overflow-hidden">
      <AnimatedGradient >
        <ArrowPathIcon className="h-24 w-24 text-sky-900 animate-spin -mt-8" />
      </AnimatedGradient>
    </div>
  );
}
