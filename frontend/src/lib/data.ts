export type Village = {
  slug: string;
  nom: string;
  region: string;
  resume: string;
  histoire: string;
  patrimoine: string;
  activites: string[];
  hebergements: string[];
  artisans: string[];
  evenements: string[];
  coordonnees: { lat: number; lng: number };
  image: string;
};

export type Offre = {
  slug: string;
  titre: string;
  villageSlug: string;
  description: string;
  duree: string;
  prix: number;
  placesDisponibles: number;
  difficulte: "Facile" | "Modéré" | "Difficile";
  inclus: string[];
  nonInclus: string[];
  image: string;
};

export const villages: Village[] = [
  {
    slug: "tiagba",
    nom: "Tiagba",
    region: "Lagunes",
    resume:
      "Village lacustre surnommé la « Venise ivoirienne », bâti sur pilotis au cœur de la lagune Ébrié.",
    histoire:
      "Fondé par le peuple Avikam, Tiagba est entièrement construit sur l'eau et accessible uniquement en pirogue.",
    patrimoine:
      "Habitat lacustre traditionnel, savoir-faire de la pêche artisanale, rites Avikam.",
    activites: ["Balade en pirogue", "Pêche traditionnelle", "Visite du village lacustre"],
    hebergements: ["Campement communautaire", "Cases d'hôtes en bord de lagune"],
    artisans: ["Tisserands de filets", "Sculpteurs de pirogues"],
    evenements: ["Fête de la lagune (avril)"],
    coordonnees: { lat: 5.2167, lng: -4.9833 },
    image: "/villages/tiagba.svg",
  },
  {
    slug: "gbepleu",
    nom: "Gbêpleu",
    region: "Montagnes (Man)",
    resume:
      "Village de montagne près de Man, porte d'entrée vers les sommets et la culture Dan.",
    histoire:
      "Implanté au pied des montagnes de l'Ouest, Gbêpleu est un haut lieu de la culture Dan et de la danse sur échasses.",
    patrimoine: "Masques Dan, danse des échassiers, architecture en banco.",
    activites: ["Randonnée vers la Dent de Man", "Spectacle de danseurs sur échasses", "Pont de lianes"],
    hebergements: ["Auberge villageoise", "Camping nature"],
    artisans: ["Sculpteurs de masques", "Tisserands de pagnes traditionnels"],
    evenements: ["Festival des masques (décembre)"],
    coordonnees: { lat: 7.4, lng: -7.6 },
    image: "/villages/gbepleu.svg",
  },
  {
    slug: "assinie-anikro",
    nom: "Assinie-Anikro",
    region: "Sud-Comoé",
    resume:
      "Village côtier entre lagune et océan, réputé pour ses plages et son cadre balnéaire.",
    histoire:
      "Ancien comptoir commercial sur la côte atlantique, Assinie-Anikro est aujourd'hui un haut lieu du tourisme balnéaire ivoirien.",
    patrimoine: "Tradition Eotilé, pêche en mer, architecture côtière.",
    activites: ["Baignade", "Sports nautiques", "Excursion en lagune"],
    hebergements: ["Campement de plage", "Bungalows en bord de lagune"],
    artisans: ["Artisans du bois flotté", "Vanniers"],
    evenements: ["Régate traditionnelle (août)"],
    coordonnees: { lat: 5.1167, lng: -3.2833 },
    image: "/villages/assinie.svg",
  },
];

export const offres: Offre[] = [
  {
    slug: "decouverte-lagune-tiagba",
    titre: "Découverte de la lagune en pirogue",
    villageSlug: "tiagba",
    description:
      "Une demi-journée à bord d'une pirogue traditionnelle pour explorer le village lacustre de Tiagba et rencontrer les pêcheurs Avikam.",
    duree: "4 heures",
    prix: 15000,
    placesDisponibles: 8,
    difficulte: "Facile",
    inclus: ["Guide local", "Transport en pirogue", "Collation"],
    nonInclus: ["Transport jusqu'au village", "Repas du soir"],
    image: "/offres/tiagba-pirogue.svg",
  },
  {
    slug: "randonnee-dent-de-man",
    titre: "Randonnée vers la Dent de Man",
    villageSlug: "gbepleu",
    description:
      "Randonnée guidée à travers les montagnes de l'Ouest avec passage sur un pont de lianes et spectacle de danseurs sur échasses.",
    duree: "1 journée",
    prix: 25000,
    placesDisponibles: 12,
    difficulte: "Modéré",
    inclus: ["Guide de montagne", "Déjeuner", "Spectacle culturel"],
    nonInclus: ["Hébergement", "Équipement de randonnée"],
    image: "/offres/dent-de-man.svg",
  },
  {
    slug: "weekend-plage-assinie",
    titre: "Week-end détente à Assinie-Anikro",
    villageSlug: "assinie-anikro",
    description:
      "Deux jours entre plage et lagune, avec excursion en bateau et découverte de l'artisanat local.",
    duree: "2 jours / 1 nuit",
    prix: 45000,
    placesDisponibles: 6,
    difficulte: "Facile",
    inclus: ["Hébergement en bungalow", "Excursion en lagune", "Petit-déjeuner"],
    nonInclus: ["Transport aller-retour Abidjan", "Activités nautiques additionnelles"],
    image: "/offres/assinie-weekend.svg",
  },
];

export function getVillageBySlug(slug: string) {
  return villages.find((v) => v.slug === slug);
}

export function getOffreBySlug(slug: string) {
  return offres.find((o) => o.slug === slug);
}

export function getOffresByVillage(villageSlug: string) {
  return offres.filter((o) => o.villageSlug === villageSlug);
}
