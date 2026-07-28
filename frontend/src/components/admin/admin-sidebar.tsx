import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession, clearSessionCookies } from "@/lib/auth";

async function logout() {
  "use server";
  await clearSessionCookies();
  redirect("/admin/login");
}

export async function AdminSidebar() {
  const session = await getSession();

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-72 bg-gray-900">
      <div className="flex h-full flex-col">
        <div className="flex h-16 shrink-0 items-center px-6">
          <h1 className="text-xl font-bold text-white">Ivoire-Tour Admin</h1>
        </div>

        <nav className="flex-1 space-y-1 px-4 py-4">
          <Link
            href="/admin"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/villages"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            Villages
          </Link>
          <Link
            href="/admin/offres"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            Offres
          </Link>
          <Link
            href="/admin/reservations"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            Réservations
          </Link>
          <Link
            href="/admin/devis"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            Demandes de devis
          </Link>
          <Link
            href="/admin/contacts"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            Messages de contact
          </Link>
        </nav>

        <div className="shrink-0 border-t border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-emerald-700 flex items-center justify-center text-white text-sm font-medium">
              {session?.user_metadata?.name?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {session?.user_metadata?.name || "Admin"}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {session?.email}
              </p>
            </div>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="mt-3 w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              Déconnexion
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
