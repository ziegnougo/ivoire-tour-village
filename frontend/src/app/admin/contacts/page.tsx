import { getSupabaseAdmin } from "@/lib/auth";

async function getContactMessages() {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
  return data || [];
}

export default async function AdminContactsPage() {
  const messages = await getContactMessages();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Messages de contact</h1>
      <p className="mt-1 text-sm text-gray-600">
        Messages envoyés depuis le formulaire de contact
      </p>

      <div className="mt-8 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="rounded-xl border bg-white p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">{message.sujet}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  De: {message.nom} ({message.email})
                </p>
              </div>
              <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                message.statut === "read"
                  ? "bg-blue-100 text-blue-800"
                  : message.statut === "replied"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}>
                {message.statut}
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-600 whitespace-pre-wrap">
              {message.message}
            </p>
            <p className="mt-4 text-xs text-gray-400">
              {new Date(message.created_at).toLocaleString("fr-FR")}
            </p>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="rounded-xl border border-dashed p-12 text-center">
            <p className="text-sm text-gray-500">Aucun message pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
