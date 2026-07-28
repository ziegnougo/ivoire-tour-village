import { getSupabaseAdmin } from "@/lib/auth";

async function getStats() {
  const supabase = getSupabaseAdmin();

  const [villagesResult, offresResult, reservationsResult, devisResult, contactsResult] =
    await Promise.all([
      supabase.from("villages").select("*", { count: "exact", head: true }),
      supabase.from("offres").select("*", { count: "exact", head: true }),
      supabase.from("reservations").select("*", { count: "exact", head: true }),
      supabase.from("devis_requests").select("*", { count: "exact", head: true }),
      supabase.from("contact_messages").select("*", { count: "exact", head: true }),
    ]);

  return {
    villages: villagesResult.count || 0,
    offres: offresResult.count || 0,
    reservations: reservationsResult.count || 0,
    devis: devisResult.count || 0,
    contacts: contactsResult.count || 0,
  };
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  const cards = [
    { title: "Villages", value: stats.villages, href: "/admin/villages", color: "bg-blue-500" },
    { title: "Offres", value: stats.offres, href: "/admin/offres", color: "bg-emerald-500" },
    { title: "Réservations", value: stats.reservations, href: "/admin/reservations", color: "bg-amber-500" },
    { title: "Demandes de devis", value: stats.devis, href: "/admin/devis", color: "bg-purple-500" },
    { title: "Messages", value: stats.contacts, href: "/admin/contacts", color: "bg-pink-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-600">
        Vue d'ensemble de votre site
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {cards.map((card) => (
          <a
            key={card.title}
            href={card.href}
            className="block rounded-xl border bg-white p-6 hover:shadow-lg transition-shadow"
          >
            <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${card.color} bg-opacity-10`}>
              <span className={`text-2xl font-bold ${card.color.replace("bg-", "text-")}`}>
                {card.value}
              </span>
            </div>
            <h3 className="mt-4 text-sm font-medium text-gray-900">{card.title}</h3>
            <p className="mt-1 text-xs text-gray-500">Gérer →</p>
          </a>
        ))}
      </div>
    </div>
  );
}
