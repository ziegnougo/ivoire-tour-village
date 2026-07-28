import { getVillages as laravelGetVillages, getOffres as laravelGetOffres, getVillage as laravelGetVillage, getOffre as laravelGetOffre, createReservation as laravelCreateReservation, createDevisRequest as laravelCreateDevisRequest, createContactMessage as laravelCreateContactMessage } from "@/lib/api";
import { getVillages, getOffres, getVillage, getOffre, createReservation, createDevisRequest, createContactMessage } from "@/lib/supabase/adapter";

export const USE_SUPABASE = Boolean(
  process.env.NEXT_PUBLIC_USE_SUPABASE &&
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function getVillagesUnified() {
  if (USE_SUPABASE) return getVillages();
  return laravelGetVillages();
}

export async function getOffresUnified() {
  if (USE_SUPABASE) return getOffres();
  return laravelGetOffres();
}

export async function getVillageUnified(slug: string) {
  if (USE_SUPABASE) return getVillage(slug);
  return laravelGetVillage(slug);
}

export async function getOffreUnified(slug: string) {
  if (USE_SUPABASE) return getOffre(slug);
  return laravelGetOffre(slug);
}

export async function createReservationUnified(payload: { offre_slug: string; nom: string; email: string; date_experience: string; nombre_personnes: number }) {
  if (USE_SUPABASE) return createReservation(payload);
  return laravelCreateReservation(payload);
}

export async function createDevisRequestUnified(payload: { offre_slug: string; nom: string; email: string; telephone: string; nombre_personnes?: number; date_souhaitee?: string; message?: string }) {
  if (USE_SUPABASE) return createDevisRequest(payload);
  return laravelCreateDevisRequest(payload);
}

export async function createContactMessageUnified(payload: { nom: string; email: string; sujet: string; message: string }) {
  if (USE_SUPABASE) return createContactMessage(payload);
  return laravelCreateContactMessage(payload);
}
