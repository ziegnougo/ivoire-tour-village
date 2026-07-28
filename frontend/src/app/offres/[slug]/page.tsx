import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getOffre } from "@/lib/data";
import { RealtimeOffrePage } from "@/components/realtime-offre-detail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const offre = await getOffre(slug);
  if (!offre) return {};
  return {
    title: `${offre.titre} | Ivoire-Tour Village`,
    description: offre.description,
  };
}

export default async function OffrePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <RealtimeOffrePage params={params} />;
}
