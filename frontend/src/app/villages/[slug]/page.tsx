import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getVillage } from "@/lib/data";
import { RealtimeVillagePage } from "@/components/realtime-village-detail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await getVillage(slug);
  if (!result) return {};
  return {
    title: `${result.village.nom} | Ivoire-Tour Village`,
    description: result.village.resume,
  };
}

export default async function VillagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <RealtimeVillagePage params={params} />;
}
