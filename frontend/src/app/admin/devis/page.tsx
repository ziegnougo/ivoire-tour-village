import { getSupabaseAdmin } from "@/lib/auth";

async function getDevisRequests() {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase.from("devis_requests").select("*, offres(titre)").order("created_at", { ascending: false });
  return data || [];
}

export default async function AdminDevisPage() {
  const devisRequests = await getDevisRequests();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Demandes de devis</h1>
      <p className="mt-1 text-sm text-gray-600">
        Suivez les demandes de devis de vos clients
      </p>

      <div className="mt-8 block overflow-hidden rounded-xl border bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Offre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Téléphone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Date souhaitée
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Statut
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {devisRequests.map((devis) => (
              <tr key={devis.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div>{devis.nom}</div>
                  <div className="text-xs text-gray-400">{devis.email}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {devis.offres?.titre || "—"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {devis.telephone || "—"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {devis.date_souhaitee || "—"}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                    devis.statut === "accepted"
                      ? "bg-green-100 text-green-800"
                      : devis.statut === "rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {devis.statut}
                  </span>
                </td>
              </tr>
            ))}
            {devisRequests.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                  Aucune demande de devis pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
