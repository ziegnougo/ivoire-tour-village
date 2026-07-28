import { supabase } from "./client";
import { Village, Offre } from "./client";

export async function getVillages(): Promise<Village[]> {
  const { data, error } = await supabase
    .from("villages")
    .select("*")
    .order("nom", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function getVillageBySlug(slug: string): Promise<Village | null> {
  const { data, error } = await supabase
    .from("villages")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}

export async function getOffres(): Promise<Offre[]> {
  const { data, error } = await supabase
    .from("offres")
    .select("*, village:villages(*)")
    .order("titre", { ascending: true });

  if (error) throw error;
  return (data ?? []) as Offre[];
}

export async function getOffreBySlug(slug: string): Promise<Offre | null> {
  const { data, error } = await supabase
    .from("offres")
    .select("*, village:villages(*)")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}

export async function createReservation(payload: {
  offre_id: number;
  nom: string;
  email: string;
  date_experience: string;
  nombre_personnes: number;
  prix_total: number;
}) {
  const { data, error } = await supabase
    .from("reservations")
    .insert(payload)
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function createDevisRequest(payload: {
  offre_id: number;
  nom: string;
  email: string;
  telephone?: string;
  nombre_personnes: number;
  date_souhaitee?: string;
  message?: string;
}) {
  const { data, error } = await supabase
    .from("devis_requests")
    .insert(payload)
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function createContactMessage(payload: {
  nom: string;
  email: string;
  sujet: string;
  message: string;
}) {
  const { data, error } = await supabase
    .from("contact_messages")
    .insert(payload)
    .select("*")
    .single();

  if (error) throw error;
  return data;
}
