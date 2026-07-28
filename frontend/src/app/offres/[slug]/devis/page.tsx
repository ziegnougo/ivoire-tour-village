import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getOffre } from "@/lib/data";
import { DevisForm } from "@/components/devis-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const offre = await getOffre(slug);
  if (!offre) return {};
  return { title: `Demander un devis — ${offre.titre} | Ivoire-Tour Village` };
}

export default async function DevisPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const offre = await getOffre(slug);
  if (!offre) notFound();

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <Link
        href={`/offres/${offre.slug}`}
        className="text-sm text-muted-foreground hover:underline"
      >
        ← Retour à l&apos;offre
      </Link>
      <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
        Demander un devis
      </h1>
      <p className="mt-2 text-muted-foreground">{offre.titre}</p>

      <div className="mt-8">
        <DevisForm offre={offre} />
      </div>
    </div>
  );
}
