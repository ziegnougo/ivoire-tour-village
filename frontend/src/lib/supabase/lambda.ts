import { getVillages, getOffres } from "./db";
import type { Village as ApiVillage, Offre as ApiOffre } from "@/lib/api";

export function mapSupabaseVillage(row: any): ApiVillage {
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

export function mapSupabaseOffre(row: any, villageSlug = "", villageNom = ""): ApiOffre {
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

export async function fetchVillages() {
  const villages = await getVillages();
  return villages.map(mapSupabaseVillage);
}

export async function fetchVillage(slug: string) {
  const row = await import("./client").then((m) => m.supabase)
    .from("villages")
    .select("*, offres(*)")
    .eq("slug", slug)
    .single();

  if (row.error || !row.data) return null;
  const { Village } = await import("./client");
  const village = mapSupabaseVillage(row.data);
  const offres = (row.data.offres ?? []).map((o: any) => mapSupabaseOffre(o, village.slug, village.nom));
  return { village, offres };
}

export async function fetchOffres() {
  const rows = await getOffres();
  return rows.map((o) => mapSupabaseOffre(o));
}

export async function fetchOffre(slug: string) {
  const { supabase } = await import("./client");
  const { data, error } = await supabase
    .from("offres")
    .select("*, village:villages(*)")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return mapSupabaseOffre(data, data.village?.slug, data.village?.nom);
}

export async function submitReservation(payload: { offre_slug: string; nom: string; email: string; date_experience: string; nombre_personnes: number }) {
  const { supabase } = await import("./client");

  const { data: offre, error: offreError } = await supabase.from("offres").select("id, prix").eq("slug", payload.offre_slug).single();
  if (offreError || !offre) throw new Error("Offre introuvable");

  const prix_total = Number(offre.prix) * payload.nombre_personnes;

  const { data, error } = await supabase
    .from("reservations")
    .insert({
      offre_id: offre.id,
      nom: payload.nom,
      email: payload.email,
      date_experience: payload.date_experience,
      nombre_personnes: payload.nombre_personnes,
      prix_total,
      statut: "pending",
    })
    .select("*")
    .single();

  if (error) throw error;
  return { reference: (data as any).reference };
}

export async function submitDevisRequest(payload: { offre_slug: string; nom: string; email: string; telephone: string; nombre_personnes?: number; date_souhaitee?: string; message?: string }) {
  const { supabase } = await import("./client");

  const { data: offre, error: offreError } = await supabase.from("offres").select("id").eq("slug", payload.offre_slug).single();
  if (offreError || !offre) throw new Error("Offre introuvable");

  const { data, error } = await supabase.from("devis_requests").insert({
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

export async function submitContactMessage(payload: { nom: string; email: string; sujet: string; message: string }) {
  const { supabase } = await import("./client");

  const { data, error } = await supabase.from("contact_messages").insert({
    nom: payload.nom,
    email: payload.email,
    sujet: payload.sujet,
    message: payload.message,
    statut: "pending",
  }).select("*").single();

  if (error) throw error;
  return data;
}
