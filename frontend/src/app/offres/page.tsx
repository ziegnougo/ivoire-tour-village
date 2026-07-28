import type { Metadata } from "next";
import { getOffres, getVillages } from "@/lib/data";
import { RealtimeOffres } from "@/components/realtime-offres";

export const metadata: Metadata = {
  title: "Offres touristiques | Ivoire-Tour Village",
  description:
    "Réservez des expériences de camping, des ateliers et des immersions culturelles dans les villages de Côte d'Ivoire.",
};

export default async function OffresPage() {
  const [offres, villages] = await Promise.all([getOffres(), getVillages()]);

  return <RealtimeOffres initialOffres={offres} initialVillages={villages} />;
}
