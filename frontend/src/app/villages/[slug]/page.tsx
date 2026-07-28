import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getVillage } from "@/lib/data";
import { OffreCard } from "@/components/offre-card";
import { Badge } from "@/components/ui/badge";
import { VillageMap } from "@/components/map/village-map";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await getVillage(slug);
  if (!result) return {};
  return {
    title: `${result.village.nom} | Ivoire-Tour Village`,
    description: result.village.resume,
  };
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-700" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function VillagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getVillage(slug);
  if (!result) notFound();

  const { village, offres: offresDuVillage } = result;

  return (
    <div>
      <div className="relative h-72 w-full overflow-hidden sm:h-96">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={village.image}
          alt={village.nom}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-start justify-end px-4 pb-10">
          <div className="mx-auto w-full max-w-6xl">
            <Badge className="bg-white/90 text-foreground hover:bg-white/90">
              {village.region}
            </Badge>
            <h1 className="mt-3 text-3xl font-bold text-white sm:text-5xl">
              {village.nom}
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <div>
            <h2 className="text-lg font-semibold">Histoire</h2>
            <p className="mt-3 text-muted-foreground">{village.histoire}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Patrimoine</h2>
            <p className="mt-3 text-muted-foreground">{village.patrimoine}</p>
          </div>
          <InfoList title="Activités" items={village.activites} />
          <InfoList title="Hébergements" items={village.hebergements} />
          <InfoList title="Artisans" items={village.artisans} />
          <InfoList title="Événements" items={village.evenements} />
        </div>

        <aside className="space-y-6">
          <VillageMap
            villages={[village]}
            center={[village.coordonnees.lat, village.coordonnees.lng]}
            zoom={11}
            height={260}
          />
          <div className="rounded-xl border p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Coordonnées GPS
            </h2>
            <p className="mt-2 text-sm">
              {village.coordonnees.lat.toFixed(4)},{" "}
              {village.coordonnees.lng.toFixed(4)}
            </p>
          </div>
          <Link
            href="/offres"
            className="block rounded-full bg-emerald-700 px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-emerald-800"
          >
            Réserver une expérience
          </Link>
        </aside>
      </div>

      {offresDuVillage.length > 0 && (
        <div className="bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="text-2xl font-bold">Offres à {village.nom}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {offresDuVillage.map((offre) => (
                <OffreCard key={offre.slug} offre={offre} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
