import { getSupabaseAdmin } from "@/lib/auth";
import Link from "next/link";

async function getVillages() {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase.from("villages").select("*").order("nom", { ascending: true });
  return data || [];
}

export default async function AdminVillagesPage() {
  const villages = await getVillages();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Villages</h1>
          <p className="mt-1 text-sm text-gray-600">
            Gérez les villages et leurs offres
          </p>
        </div>
        <Link
          href="/admin/villages/new"
          className="rounded-full bg-emerald-700 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
        >
          Ajouter un village
        </Link>
      </div>

      <div className="mt-8 block overflow-hidden rounded-xl border bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Région
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Slug
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {villages.map((village) => (
              <tr key={village.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {village.nom}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {village.region || "—"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {village.slug}
                </td>
                <td className="px-6 py-4 text-right text-sm">
                  <Link
                    href={`/admin/villages/${village.id}`}
                    className="font-medium text-emerald-700 hover:text-emerald-800"
                  >
                    Modifier
                  </Link>
                </td>
              </tr>
            ))}
            {villages.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-sm text-gray-500">
                  Aucun village pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
