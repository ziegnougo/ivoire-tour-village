import Link from "next/link";
import { getVillages, getOffres } from "@/lib/data";
import { VillageCard } from "@/components/village-card";
import { OffreCard } from "@/components/offre-card";
import { FadeIn } from "@/components/fade-in";

export default async function Home() {
  const [villages, offres] = await Promise.all([getVillages(), getOffres()]);

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:py-32">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
              Association Ivoire-Tour Village
            </p>
            <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-6xl">
              Découvrez les villages touristiques de{" "}
              <span className="text-orange-500">Côte d&apos;Ivoire</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Réservez des expériences de camping, explorez le patrimoine
              culturel et soutenez la digitalisation des communautés locales.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/villages"
                className="rounded-full bg-emerald-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
              >
                Explorer les villages
              </Link>
              <Link
                href="/offres"
                className="rounded-full border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
              >
                Voir les offres
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <FadeIn>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                Villages à la une
              </h2>
              <p className="mt-2 text-muted-foreground">
                Patrimoine, traditions et paysages au cœur du pays.
              </p>
            </div>
            <Link
              href="/villages"
              className="hidden text-sm font-medium text-emerald-700 hover:underline sm:block"
            >
              Tous les villages →
            </Link>
          </div>
        </FadeIn>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {villages.map((village, i) => (
            <FadeIn key={village.slug} delay={i * 0.1}>
              <VillageCard village={village} />
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <FadeIn>
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold sm:text-3xl">
                  Offres populaires
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Expériences de camping et d&apos;immersion à réserver en
                  ligne.
                </p>
              </div>
              <Link
                href="/offres"
                className="hidden text-sm font-medium text-emerald-700 hover:underline sm:block"
              >
                Toutes les offres →
              </Link>
            </div>
          </FadeIn>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offres.map((offre, i) => (
              <FadeIn key={offre.slug} delay={i * 0.1}>
                <OffreCard offre={offre} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
