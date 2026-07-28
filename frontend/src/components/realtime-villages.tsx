"use client";

import { useState, useEffect } from "react";
import { getVillages } from "@/lib/data";
import { useRealtimeVillages } from "@/hooks/use-realtime";
import { VillageMap } from "@/components/map/village-map";
import { VillagesExplorer } from "@/components/villages-explorer";
import { FadeIn } from "@/components/fade-in";

export function RealtimeVillages({ initialVillages }: { initialVillages: any[] }) {
  const [villages, setVillages] = useState(initialVillages);

  useRealtimeVillages(async () => {
    const updated = await getVillages();
    setVillages(updated);
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <FadeIn>
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">
              Les villages touristiques
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Chaque village dispose d&apos;une fiche complète : histoire,
              patrimoine, activités, hébergements et artisanat local.
            </p>
          </div>
        </div>
      </FadeIn>

      <div className="mt-8">
        <VillageMap villages={villages} center={[7.54, -5.55]} zoom={6} />
      </div>

      <div className="mt-10">
        <VillagesExplorer villages={villages} />
      </div>
    </div>
  );
}
