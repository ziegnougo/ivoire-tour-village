"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getOffre } from "@/lib/data";
import { useRealtimeOffres } from "@/hooks/use-realtime";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FavoriteButton } from "@/components/favorite-button";

export function RealtimeOffrePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = params;
  return <OffreDetail slug={slug} />;
}

function OffreDetail({ slug }: { slug: string }) {
  const [offre, setOffre] = useState<Awaited<ReturnType<typeof getOffre>>>(null);

  async function load() {
    const data = await getOffre(slug);
    setOffre(data);
  }

  useRealtimeOffres(load);

  useEffect(() => {
    load();
  }, [slug]);

  if (!offre) return notFound();

  const formatPrix = (prix: number) =>
    new Intl.NumberFormat("fr-FR").format(prix) + " FCFA";

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={offre.image}
            alt={offre.titre}
            className="h-72 w-full object-cover sm:h-96"
          />
        </div>

        <div>
          {offre.villageNom && (
            <Link
              href={`/villages/${offre.villageSlug}`}
              className="text-sm font-medium uppercase tracking-wide text-emerald-700 hover:underline"
            >
              {offre.villageNom}
            </Link>
          )}
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            {offre.titre}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Badge variant="secondary">{offre.difficulte}</Badge>
            <Badge variant="secondary">{offre.duree}</Badge>
            <Badge variant="secondary">
              {offre.placesDisponibles} places disponibles
            </Badge>
          </div>
          <p className="mt-6 text-muted-foreground">{offre.description}</p>

          <Separator className="my-6" />

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">
              {formatPrix(offre.prix)}
            </span>
            <span className="text-sm text-muted-foreground">par personne</span>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/offres/${offre.slug}/reserver`}
              className="flex-1 rounded-full bg-emerald-700 px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-emerald-800"
            >
              Réserver
            </Link>
            <Link
              href={`/offres/${offre.slug}/devis`}
              className="flex-1 rounded-full border px-6 py-3 text-center text-sm font-medium transition-colors hover:bg-muted"
            >
              Demander un devis
            </Link>
            <FavoriteButton slug={offre.slug} variant="full" />
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold">Inclus</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {offre.inclus.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-700" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Non inclus</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {offre.nonInclus.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
