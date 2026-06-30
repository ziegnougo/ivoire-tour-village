import type { Metadata } from "next";
import { villages } from "@/lib/data";
import { VillageCard } from "@/components/village-card";

export const metadata: Metadata = {
  title: "Villages touristiques | Ivoire-Tour Village",
  description:
    "Parcourez les fiches complètes des villages touristiques de Côte d'Ivoire : histoire, patrimoine, activités et hébergements.",
};

export default function VillagesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold sm:text-4xl">
        Les villages touristiques
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Chaque village dispose d&apos;une fiche complète : histoire,
        patrimoine, activités, hébergements et artisanat local.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {villages.map((village) => (
          <VillageCard key={village.slug} village={village} />
        ))}
      </div>
    </div>
  );
}
