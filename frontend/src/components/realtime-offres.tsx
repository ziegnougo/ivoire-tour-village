"use client";

import { useState, useEffect } from "react";
import { getOffres, getVillages } from "@/lib/data";
import { useRealtimeVillages, useRealtimeOffres } from "@/hooks/use-realtime";
import { OffresExplorer } from "@/components/offres-explorer";
import { FadeIn } from "@/components/fade-in";

export function RealtimeOffres({ initialOffres, initialVillages }: { initialOffres: any[]; initialVillages: any[] }) {
  const [offres, setOffres] = useState(initialOffres);
  const [villages, setVillages] = useState(initialVillages);

  useRealtimeVillages(async () => {
    const updated = await getVillages();
    setVillages(updated);
  });

  useRealtimeOffres(async () => {
    const updated = await getOffres();
    setOffres(updated);
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <FadeIn>
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">Nos offres</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Réservez votre prochaine aventure : camping, randonnée,
              ateliers artisanaux et plus encore.
            </p>
          </div>
        </div>
      </FadeIn>

      <div className="mt-10">
        <OffresExplorer offres={offres} villages={villages} />
      </div>
    </div>
  );
}
