import { getSupabaseAdmin } from "@/lib/auth";

async function getReservations() {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase.from("reservations").select("*, offres(titre)").order("created_at", { ascending: false });
  return data || [];
}

export default async function AdminReservationsPage() {
  const reservations = await getReservations();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Réservations</h1>
      <p className="mt-1 text-sm text-gray-600">
        Suivez les réservations de vos clients
      </p>

      <div className="mt-8 block overflow-hidden rounded-xl border bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Référence
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Offre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Statut
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {reservations.map((reservation) => (
              <tr key={reservation.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-mono text-gray-900">
                  {reservation.reference}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div>{reservation.nom}</div>
                  <div className="text-xs text-gray-400">{reservation.email}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {reservation.offres?.titre || "—"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {reservation.date_experience}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                    reservation.statut === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : reservation.statut === "cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {reservation.statut}
                  </span>
                </td>
              </tr>
            ))}
            {reservations.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                  Aucune réservation pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
