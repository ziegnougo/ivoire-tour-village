import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getVillageBySlug, type Offre } from "@/lib/data";

const formatPrix = (prix: number) =>
  new Intl.NumberFormat("fr-FR").format(prix) + " FCFA";

export function OffreCard({ offre }: { offre: Offre }) {
  const village = getVillageBySlug(offre.villageSlug);

  return (
    <Link
      href={`/offres/${offre.slug}`}
      className="group overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-lg"
    >
      <div className="relative h-44 w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={offre.image}
          alt={offre.titre}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge className="absolute left-3 top-3 bg-white/90 text-foreground hover:bg-white/90">
          {offre.difficulte}
        </Badge>
      </div>
      <div className="p-5">
        {village && (
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
            {village.nom}
          </p>
        )}
        <h3 className="mt-1 text-lg font-semibold">{offre.titre}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {offre.description}
        </p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{offre.duree}</span>
          <span className="font-semibold text-foreground">
            {formatPrix(offre.prix)}
          </span>
        </div>
      </div>
    </Link>
  );
}
