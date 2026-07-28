import type { Metadata } from "next";
import { getVillages } from "@/lib/data";
import { RealtimeVillages } from "@/components/realtime-villages";

export const metadata: Metadata = {
  title: "Villages touristiques | Ivoire-Tour Village",
  description:
    "Parcourez les fiches complètes des villages touristiques de Côte d'Ivoire : histoire, patrimoine, activités et hébergements.",
};

export default async function VillagesPage() {
  const villages = await getVillages();

  return <RealtimeVillages initialVillages={villages} />;
}
