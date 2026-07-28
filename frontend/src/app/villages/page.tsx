import type { Metadata } from "next";
import { getVillagesUnified } from "@/lib/data";
import { VillagesExplorer } from "@/components/villages-explorer";
import { VillageMap } from "@/components/map/village-map";

export const metadata: Metadata = {
  title: "Villages touristiques | Ivoire-Tour Village",
  description:
    "Parcourez les fiches complètes des villages touristiques de Côte d'Ivoire : histoire, patrimoine, activités et hébergements.",
};

export default async function VillagesPage() {
  const villages = await getVillagesUnified();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold sm:text-4xl">
        Les villages touristiques
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Chaque village dispose d&apos;une fiche complète : histoire,
        patrimoine, activités, hébergements et artisanat local.
      </p>

      <div className="mt-8">
        <VillageMap villages={villages} center={[7.54, -5.55]} zoom={6} />
      </div>

      <div className="mt-10">
        <VillagesExplorer villages={villages} />
      </div>
    </div>
  );
}
