import type { Metadata } from "next";
import { offres } from "@/lib/data";
import { OffreCard } from "@/components/offre-card";

export const metadata: Metadata = {
  title: "Offres & expériences | Ivoire-Tour Village",
  description:
    "Réservez des expériences de camping et d'immersion dans les villages touristiques de Côte d'Ivoire.",
};

export default function OffresPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold sm:text-4xl">
        Offres & expériences
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Des excursions, randonnées et séjours de camping à réserver en ligne
        dans les villages partenaires.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {offres.map((offre) => (
          <OffreCard key={offre.slug} offre={offre} />
        ))}
      </div>
    </div>
  );
}
