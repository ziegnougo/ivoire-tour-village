const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

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
  villageNom: string;
  description: string;
  duree: string;
  prix: number;
  placesDisponibles: number;
  difficulte: "Facile" | "Modéré" | "Difficile";
  inclus: string[];
  nonInclus: string[];
  image: string;
};

type RawVillage = {
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
  latitude: string;
  longitude: string;
  image: string | null;
  offres?: RawOffre[];
};

type RawOffre = {
  slug: string;
  titre: string;
  description: string;
  duree: string;
  prix: number;
  places_disponibles: number;
  difficulte: Offre["difficulte"];
  inclus: string[];
  non_inclus: string[];
  image: string | null;
  village?: RawVillage;
};

function mapVillage(raw: RawVillage): Village {
  return {
    slug: raw.slug,
    nom: raw.nom,
    region: raw.region,
    resume: raw.resume,
    histoire: raw.histoire,
    patrimoine: raw.patrimoine,
    activites: raw.activites,
    hebergements: raw.hebergements,
    artisans: raw.artisans,
    evenements: raw.evenements,
    coordonnees: { lat: parseFloat(raw.latitude), lng: parseFloat(raw.longitude) },
    image: raw.image ?? "",
  };
}

function mapOffre(raw: RawOffre, village?: { slug: string; nom: string }): Offre {
  return {
    slug: raw.slug,
    titre: raw.titre,
    villageSlug: village?.slug ?? raw.village?.slug ?? "",
    villageNom: village?.nom ?? raw.village?.nom ?? "",
    description: raw.description,
    duree: raw.duree,
    prix: raw.prix,
    placesDisponibles: raw.places_disponibles,
    difficulte: raw.difficulte,
    inclus: raw.inclus,
    nonInclus: raw.non_inclus,
    image: raw.image ?? "",
  };
}

export class ApiError extends Error {
  errors?: Record<string, string[]>;

  constructor(message: string, errors?: Record<string, string[]>) {
    super(message);
    this.name = "ApiError";
    this.errors = errors;
  }
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new ApiError(body?.message ?? `Erreur API (${res.status})`, body?.errors);
  }

  return res.json();
}

export async function getVillages(params?: { region?: string; q?: string }): Promise<Village[]> {
  const search = new URLSearchParams(params).toString();
  const raw = await apiFetch<RawVillage[]>(`/villages${search ? `?${search}` : ""}`);
  return raw.map(mapVillage);
}

export async function getVillage(
  slug: string
): Promise<{ village: Village; offres: Offre[] } | null> {
  try {
    const raw = await apiFetch<RawVillage>(`/villages/${slug}`);
    return {
      village: mapVillage(raw),
      offres: (raw.offres ?? []).map((o) => mapOffre(o, { slug: raw.slug, nom: raw.nom })),
    };
  } catch {
    return null;
  }
}

export async function getOffres(params?: {
  village?: string;
  difficulte?: string;
  prix_max?: number;
  q?: string;
}): Promise<Offre[]> {
  const search = new URLSearchParams(
    Object.fromEntries(Object.entries(params ?? {}).map(([k, v]) => [k, String(v)]))
  ).toString();
  const raw = await apiFetch<RawOffre[]>(`/offres${search ? `?${search}` : ""}`);
  return raw.map((o) => mapOffre(o));
}

export async function getOffre(slug: string): Promise<Offre | null> {
  try {
    const raw = await apiFetch<RawOffre>(`/offres/${slug}`);
    return mapOffre(raw);
  } catch {
    return null;
  }
}

export function createReservation(payload: {
  offre_slug: string;
  nom: string;
  email: string;
  date_experience: string;
  nombre_personnes: number;
}) {
  return apiFetch<{ reference: string }>("/reservations", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function createDevisRequest(payload: {
  offre_slug: string;
  nom: string;
  email: string;
  telephone: string;
  nombre_personnes?: number;
  date_souhaitee?: string;
  message?: string;
}) {
  return apiFetch("/devis-requests", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function createContactMessage(payload: {
  nom: string;
  email: string;
  sujet: string;
  message: string;
}) {
  return apiFetch("/contact-messages", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
