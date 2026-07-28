"use client";

import { useMemo, useState } from "react";
import { VillageCard } from "@/components/village-card";
import type { Village } from "@/lib/supabase/types";

export function VillagesExplorer({ villages }: { villages: Village[] }) {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("Toutes");

  const regions = useMemo(
    () => ["Toutes", ...Array.from(new Set(villages.map((v) => v.region)))],
    [villages]
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return villages.filter((village) => {
      const matchesRegion = region === "Toutes" || village.region === region;
      const matchesQuery =
        query === "" ||
        village.nom.toLowerCase().includes(query) ||
        village.resume.toLowerCase().includes(query);
      return matchesRegion && matchesQuery;
    });
  }, [villages, search, region]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un village..."
          className="w-full rounded-full border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30 sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                region === r
                  ? "border-emerald-700 bg-emerald-700 text-white"
                  : "hover:bg-muted"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        {filtered.length} village{filtered.length > 1 ? "s" : ""} trouvé
        {filtered.length > 1 ? "s" : ""}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((village) => (
            <VillageCard key={village.slug} village={village} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          Aucun village ne correspond à votre recherche.
        </div>
      )}
    </div>
  );
}
