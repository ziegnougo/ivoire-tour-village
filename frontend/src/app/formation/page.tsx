import type { Metadata } from "next";
import { Award, ClipboardCheck, PlayCircle, Users } from "lucide-react";
import { FadeIn } from "@/components/fade-in";

export const metadata: Metadata = {
  title: "Formation | Ivoire-Tour Village",
  description:
    "Le programme de formation des communautés villageoises pour la digitalisation et l'accueil touristique.",
};

const fonctionnalites = [
  {
    icon: PlayCircle,
    titre: "Modules vidéo",
    description: "Des cours en vidéo, accessibles à votre rythme.",
  },
  {
    icon: ClipboardCheck,
    titre: "Quiz de validation",
    description: "Des quiz pour vérifier les acquis après chaque module.",
  },
  {
    icon: Award,
    titre: "Certificats",
    description: "Une attestation délivrée à la fin de chaque parcours.",
  },
  {
    icon: Users,
    titre: "Suivi des apprenants",
    description: "Un suivi individualisé de la progression de chacun.",
  },
];

const themes = [
  "Accueil et relation avec les visiteurs",
  "Gestion des réservations en ligne",
  "Valorisation du patrimoine et prise de photos/vidéos",
  "Hygiène et sécurité dans les hébergements",
  "Bases de la gestion financière et de la facturation",
  "Utilisation des réseaux sociaux pour promouvoir son village",
];

export default function FormationPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-emerald-50 to-white">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
              Formation des communautés
            </p>
            <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              Accompagner les villages dans leur digitalisation
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Un programme de formation en ligne pour aider les communautés
              locales à accueillir les visiteurs, gérer leurs réservations et
              valoriser leur patrimoine.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fonctionnalites.map(({ icon: Icon, titre, description }, i) => (
            <FadeIn key={titre} delay={i * 0.1}>
              <div className="h-full rounded-xl border p-6">
                <Icon className="h-6 w-6 text-emerald-700" />
                <h2 className="mt-4 font-semibold">{titre}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-20">
          <FadeIn>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Thématiques envisagées
            </h2>
            <p className="mt-3 text-muted-foreground">
              Le contenu précis des parcours sera co-construit avec les
              villages partenaires.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {themes.map((theme) => (
                <li key={theme} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                  <span className="text-muted-foreground">{theme}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 text-center">
        <FadeIn>
          <p className="rounded-xl border border-dashed p-6 text-sm text-muted-foreground">
            La plateforme de formation (basée sur Moodle) est en cours de
            déploiement. Les premiers modules seront annoncés sur cette page
            et sur nos réseaux sociaux.
          </p>
        </FadeIn>
      </section>
    </div>
  );
}
