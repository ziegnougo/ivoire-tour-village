import { getVillages, getOffres, getVillage, getOffre, createReservation, createDevisRequest, createContactMessage, ApiError } from "@/lib/api";
import { fetchVillages, fetchOffres, fetchVillage, fetchOffre, submitReservation, submitDevisRequest, submitContactMessage } from "@/lib/supabase/adapter";

export const USE_SUPABASE = Boolean(
  process.env.NEXT_PUBLIC_USE_SUPABASE &&
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function getVillagesUnified() {
  if (USE_SUPABASE) return fetchVillages();
  return getVillages();
}

export async function getOffresUnified() {
  if (USE_SUPABASE) return fetchOffres();
  return getOffres();
}

export async function getVillageUnified(slug: string) {
  if (USE_SUPABASE) return fetchVillage(slug);
  return getVillage(slug);
}

export async function getOffreUnified(slug: string) {
  if (USE_SUPABASE) return fetchOffre(slug);
  return getOffre(slug);
}

export async function createReservationUnified(payload: { offre_slug: string; nom: string; email: string; date_experience: string; nombre_personnes: number }) {
  if (USE_SUPABASE) return submitReservation(payload);
  return createReservation(payload);
}

export async function createDevisRequestUnified(payload: { offre_slug: string; nom: string; email: string; telephone: string; nombre_personnes?: number; date_souhaitee?: string; message?: string }) {
  if (USE_SUPABASE) return submitDevisRequest(payload);
  return createDevisRequest(payload);
}

export async function createContactMessageUnified(payload: { nom: string; email: string; sujet: string; message: string }) {
  if (USE_SUPABASE) return submitContactMessage(payload);
  return createContactMessage(payload);
}
