import { supabase } from "./client";
import type { Village as ApiVillage, Offre as ApiOffre } from "@/lib/api";

function mapSupabaseVillage(row: any): ApiVillage {
  return {
    slug: row.slug,
    nom: row.nom,
    region: row.region ?? "",
    resume: row.resume ?? "",
    histoire: row.histoire ?? "",
    patrimoine: row.patrimoine ?? "",
    activites: Array.isArray(row.activites) ? row.activites : [],
    hebergements: Array.isArray(row.hebergements) ? row.hebergements : [],
    artisans: Array.isArray(row.artisans) ? row.artisans : [],
    evenements: Array.isArray(row.evenements) ? row.evenements : [],
    coordonnees: { lat: Number(row.latitude), lng: Number(row.longitude) },
    image: row.image ?? "",
  };
}

function mapSupabaseOffre(row: any, villageSlug = "", villageNom = ""): ApiOffre {
  return {
    slug: row.slug,
    titre: row.titre,
    villageSlug: villageSlug || row.village?.slug || "",
    villageNom: villageNom || row.village?.nom || "",
    description: row.description ?? "",
    duree: row.duree ?? "",
    prix: Number(row.prix) || 0,
    placesDisponibles: Number(row.places_disponibles) || 0,
    difficulte: (row.difficulte as ApiOffre["difficulte"]) ?? "Modéré",
    inclus: Array.isArray(row.inclus) ? row.inclus : [],
    nonInclus: Array.isArray(row.non_inclus) ? row.non_inclus : [],
    image: row.image ?? "",
  };
}

function requireSupabase() {
  if (!supabase) throw new Error("Supabase is not configured");
  return supabase;
}

export async function getVillages(): Promise<ApiVillage[]> {
  const sb = requireSupabase();
  const { data, error } = await sb.from("villages").select("*").order("nom", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapSupabaseVillage);
}

export async function getVillage(slug: string): Promise<{ village: ApiVillage; offres: ApiOffre[] } | null> {
  const sb = requireSupabase();
  const { data, error } = await sb.from("villages").select("*, offres(*)").eq("slug", slug).single();
  if (error || !data) return null;

  const village = mapSupabaseVillage(data);
  const offres = (data.offres ?? []).map((o: any) => mapSupabaseOffre(o, village.slug, village.nom));
  return { village, offres };
}

export async function getOffres(): Promise<ApiOffre[]> {
  const sb = requireSupabase();
  const { data, error } = await sb.from("offres").select("*, village:villages(*)").order("titre", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((o: any) => mapSupabaseOffre(o));
}

export async function getOffre(slug: string): Promise<ApiOffre | null> {
  const sb = requireSupabase();
  const { data, error } = await sb.from("offres").select("*, village:villages(*)").eq("slug", slug).single();
  if (error || !data) return null;
  return mapSupabaseOffre(data, data.village?.slug, data.village?.nom);
}

export async function createReservation(payload: { offre_slug: string; nom: string; email: string; date_experience: string; nombre_personnes: number }) {
  const sb = requireSupabase();
  const { data: offre, error: offreError } = await sb.from("offres").select("id, prix").eq("slug", payload.offre_slug).single();
  if (offreError || !offre) throw new Error("Offre introuvable");

  const prix_total = Number(offre.prix) * payload.nombre_personnes;
  const { data, error } = await sb.from("reservations").insert({
    offre_id: offre.id,
    nom: payload.nom,
    email: payload.email,
    date_experience: payload.date_experience,
    nombre_personnes: payload.nombre_personnes,
    prix_total,
    statut: "pending",
  }).select("*").single();

  if (error) throw error;
  return { reference: (data as any).reference };
}

export async function createDevisRequest(payload: { offre_slug: string; nom: string; email: string; telephone: string; nombre_personnes?: number; date_souhaitee?: string; message?: string }) {
  const sb = requireSupabase();
  const { data: offre, error: offreError } = await sb.from("offres").select("id").eq("slug", payload.offre_slug).single();
  if (offreError || !offre) throw new Error("Offre introuvable");

  const { data, error } = await sb.from("devis_requests").insert({
    offre_id: offre.id,
    nom: payload.nom,
    email: payload.email,
    telephone: payload.telephone,
    nombre_personnes: payload.nombre_personnes || 1,
    date_souhaitee: payload.date_souhaitee || null,
    message: payload.message || null,
    statut: "pending",
  }).select("*").single();

  if (error) throw error;
  return data;
}

export async function createContactMessage(payload: { nom: string; email: string; sujet: string; message: string }) {
  const sb = requireSupabase();
  const { data, error } = await sb.from("contact_messages").insert({
    nom: payload.nom,
    email: payload.email,
    sujet: payload.sujet,
    message: payload.message,
    statut: "pending",
  }).select("*").single();

  if (error) throw error;
  return data;
}
