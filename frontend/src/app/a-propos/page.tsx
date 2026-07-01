import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/fade-in";

export const metadata: Metadata = {
  title: "À propos | Ivoire-Tour Village",
  description:
    "L'association Ivoire-Tour Village accompagne la numérisation des villages touristiques de Côte d'Ivoire.",
};

const valeurs = [
  {
    titre: "Valoriser",
    description:
      "Mettre en lumière le patrimoine culturel, l'artisanat et les traditions de chaque village touristique.",
  },
  {
    titre: "Partager",
    description:
      "Faire découvrir ces lieux au plus grand nombre grâce à une plateforme numérique accessible et moderne.",
  },
  {
    titre: "Développer",
    description:
      "Accompagner les communautés locales dans leur digitalisation et la commercialisation de leurs expériences.",
  },
];

const objectifs = [
  "Promouvoir les villages touristiques de Côte d'Ivoire",
  "Commercialiser les expériences de camping",
  "Gérer les réservations de bout en bout",
  "Former les communautés locales au numérique",
  "Valoriser le patrimoine culturel ivoirien",
  "Collecter des données statistiques sur le tourisme local",
  "Accompagner la digitalisation des villages",
];

export default function AProposPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-emerald-50 to-white">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
              Association Ivoire-Tour Village
            </p>
            <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              Numériser les villages touristiques de Côte d&apos;Ivoire
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Nous construisons une plateforme numérique nationale pour
              connecter les villages touristiques ivoiriens aux visiteurs,
              tout en accompagnant les communautés locales dans leur
              digitalisation.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-6 sm:grid-cols-3">
          {valeurs.map((valeur, i) => (
            <FadeIn key={valeur.titre} delay={i * 0.1}>
              <div className="h-full rounded-xl border p-6">
                <h2 className="text-xl font-semibold text-emerald-700">
                  {valeur.titre}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  {valeur.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-20">
          <FadeIn>
            <h2 className="text-2xl font-bold sm:text-3xl">Nos objectifs</h2>
            <ul className="mt-8 space-y-4">
              {objectifs.map((objectif) => (
                <li key={objectif} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                  <span className="text-muted-foreground">{objectif}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-20 text-center">
        <FadeIn>
          <h2 className="text-2xl font-bold sm:text-3xl">
            Envie de nous rejoindre ou de collaborer ?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Villages, partenaires, bailleurs ou visiteurs : contactez-nous.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-emerald-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
          >
            Nous contacter
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}
