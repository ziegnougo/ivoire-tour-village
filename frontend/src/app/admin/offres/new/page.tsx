"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/components/admin/image-upload";

async function saveOffre(formData: FormData) {
  "use server";

  const supabase = await import("@/lib/auth").then(m => m.getSupabaseAdmin());
  const id = String(formData.get("id") || "");
  const payload = {
    slug: String(formData.get("slug")),
    titre: String(formData.get("titre")),
    village_id: Number(formData.get("village_id")),
    description: String(formData.get("description")),
    duree: String(formData.get("duree")),
    prix: Number(formData.get("prix")) || 0,
    places_disponibles: Number(formData.get("places_disponibles")) || 0,
    difficulte: String(formData.get("difficulte")),
    inclus: String(formData.get("inclus")).split("\n").filter(Boolean),
    non_inclus: String(formData.get("non_inclus")).split("\n").filter(Boolean),
    image: String(formData.get("image")),
  };

  if (id) {
    await supabase.from("offres").update(payload).eq("id", Number(id));
  } else {
    await supabase.from("offres").insert(payload);
  }

  return { success: true };
}

export default function OffreFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const router = useRouter();
  const isNew = id === "new";
  const [loading, setLoading] = useState(!isNew);
  const [offre, setOffre] = useState<any>(null);
  const [villages, setVillages] = useState<any[]>([]);
  const [image, setImage] = useState("");

  useEffect(() => {
    async function load() {
      if (!isNew) {
        const supabase = (await import("@/lib/auth")).getSupabaseAdmin();
        const { data } = await supabase.from("offres").select("*").eq("id", Number(id)).single();
        setOffre(data);
        if (data?.image) setImage(data.image);
      }
      const supabase = (await import("@/lib/auth")).getSupabaseAdmin();
      const { data } = await supabase.from("villages").select("id, nom").order("nom", { ascending: true });
      setVillages(data || []);
      setLoading(false);
    }
    load();
  }, [id, isNew]);

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">
        {isNew ? "Ajouter une offre" : "Modifier l'offre"}
      </h1>

      <form action={saveOffre} className="mt-8 space-y-6 max-w-2xl">
        <input type="hidden" name="id" defaultValue={isNew ? "" : id} />
        <input type="hidden" name="image" value={image} />

        <div>
          <label className="block text-sm font-medium text-gray-700">Titre</label>
          <input
            name="titre"
            required
            defaultValue={offre?.titre || ""}
            className="mt-1.5 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Slug</label>
          <input
            name="slug"
            required
            defaultValue={offre?.slug || ""}
            className="mt-1.5 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Village</label>
          <select
            name="village_id"
            required
            defaultValue={offre?.village_id || ""}
            className="mt-1.5 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
          >
            <option value="">Sélectionner un village</option>
            {villages.map((village) => (
              <option key={village.id} value={village.id}>
                {village.nom}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            rows={4}
            defaultValue={offre?.description || ""}
            className="mt-1.5 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Durée</label>
            <input
              name="duree"
              defaultValue={offre?.duree || ""}
              className="mt-1.5 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Difficulté</label>
            <select
              name="difficulte"
              defaultValue={offre?.difficulte || "Modéré"}
              className="mt-1.5 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
            >
              <option>Facile</option>
              <option>Modéré</option>
              <option>Difficile</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Prix (FCFA)</label>
            <input
              name="prix"
              type="number"
              defaultValue={offre?.prix || ""}
              className="mt-1.5 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Places disponibles</label>
            <input
              name="places_disponibles"
              type="number"
              defaultValue={offre?.places_disponibles || ""}
              className="mt-1.5 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Inclus (un par ligne)</label>
          <textarea
            name="inclus"
            rows={4}
            defaultValue={Array.isArray(offre?.inclus) ? offre.inclus.join("\n") : ""}
            className="mt-1.5 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Non inclus (un par ligne)</label>
          <textarea
            name="non_inclus"
            rows={4}
            defaultValue={Array.isArray(offre?.non_inclus) ? offre.non_inclus.join("\n") : ""}
            className="mt-1.5 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <ImageUpload value={image} onChange={setImage} />
          <input type="hidden" name="image" value={image} />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="rounded-full bg-emerald-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
          >
            Enregistrer
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/offres")}
            className="rounded-full border px-6 py-3 text-sm font-medium transition-colors hover:bg-gray-50"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
