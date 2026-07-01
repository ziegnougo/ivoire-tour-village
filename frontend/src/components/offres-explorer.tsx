"use client";

import { useMemo, useState } from "react";
import { OffreCard } from "@/components/offre-card";
import type { Offre, Village } from "@/lib/api";

const DIFFICULTES = ["Toutes", "Facile", "Modéré", "Difficile"] as const;
const PRIX_MAX_DEFAUT = 100000;

export function OffresExplorer({
  offres,
  villages,
}: {
  offres: Offre[];
  villages: Village[];
}) {
  const [search, setSearch] = useState("");
  const [villageSlug, setVillageSlug] = useState("Tous");
  const [difficulte, setDifficulte] =
    useState<(typeof DIFFICULTES)[number]>("Toutes");
  const [prixMax, setPrixMax] = useState(PRIX_MAX_DEFAUT);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return offres.filter((offre) => {
      const matchesQuery =
        query === "" ||
        offre.titre.toLowerCase().includes(query) ||
        offre.description.toLowerCase().includes(query);
      const matchesVillage =
        villageSlug === "Tous" || offre.villageSlug === villageSlug;
      const matchesDifficulte =
        difficulte === "Toutes" || offre.difficulte === difficulte;
      const matchesPrix = offre.prix <= prixMax;
      return matchesQuery && matchesVillage && matchesDifficulte && matchesPrix;
    });
  }, [offres, search, villageSlug, difficulte, prixMax]);

  return (
    <div>
      <div className="grid gap-4 rounded-xl border p-4 sm:grid-cols-2 lg:grid-cols-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher une offre..."
          className="rounded-full border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
        />

        <select
          value={villageSlug}
          onChange={(e) => setVillageSlug(e.target.value)}
          className="rounded-full border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
        >
          <option value="Tous">Tous les villages</option>
          {villages.map((v) => (
            <option key={v.slug} value={v.slug}>
              {v.nom}
            </option>
          ))}
        </select>

        <select
          value={difficulte}
          onChange={(e) =>
            setDifficulte(e.target.value as (typeof DIFFICULTES)[number])
          }
          className="rounded-full border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
        >
          {DIFFICULTES.map((d) => (
            <option key={d} value={d}>
              {d === "Toutes" ? "Toutes les difficultés" : d}
            </option>
          ))}
        </select>

        <div className="flex flex-col justify-center gap-1">
          <label className="text-xs text-muted-foreground">
            Prix max : {new Intl.NumberFormat("fr-FR").format(prixMax)} FCFA
          </label>
          <input
            type="range"
            min={5000}
            max={PRIX_MAX_DEFAUT}
            step={5000}
            value={prixMax}
            onChange={(e) => setPrixMax(Number(e.target.value))}
            className="accent-emerald-700"
          />
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        {filtered.length} offre{filtered.length > 1 ? "s" : ""} trouvée
        {filtered.length > 1 ? "s" : ""}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((offre) => (
            <OffreCard key={offre.slug} offre={offre} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          Aucune offre ne correspond à votre recherche.
        </div>
      )}
    </div>
  );
}
