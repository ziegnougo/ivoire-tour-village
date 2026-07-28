import { getSupabaseAdmin } from "@/lib/auth";
import Link from "next/link";

async function getOffres() {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase.from("offres").select("*, villages(nom)").order("titre", { ascending: true });
  return data || [];
}

export default async function AdminOffresPage() {
  const offres = await getOffres();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Offres</h1>
          <p className="mt-1 text-sm text-gray-600">
            Gérez les offres touristiques
          </p>
        </div>
        <Link
          href="/admin/offres/new"
          className="rounded-full bg-emerald-700 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
        >
          Ajouter une offre
        </Link>
      </div>

      <div className="mt-8 block overflow-hidden rounded-xl border bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Titre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Village
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Prix
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {offres.map((offre) => (
              <tr key={offre.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {offre.titre}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {offre.villages?.nom || "—"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {offre.prix ? `${Number(offre.prix).toLocaleString("fr-FR")} FCFA` : "—"}
                </td>
                <td className="px-6 py-4 text-right text-sm">
                  <Link
                    href={`/admin/offres/${offre.id}`}
                    className="font-medium text-emerald-700 hover:text-emerald-800"
                  >
                    Modifier
                  </Link>
                </td>
              </tr>
            ))}
            {offres.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-sm text-gray-500">
                  Aucune offre pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
