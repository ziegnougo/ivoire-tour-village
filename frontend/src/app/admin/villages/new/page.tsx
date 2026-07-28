"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/components/admin/image-upload";

async function saveVillage(formData: FormData) {
  "use server";

  const supabase = await import("@/lib/auth").then(m => m.getSupabaseAdmin());
  const id = String(formData.get("id") || "");
  const payload = {
    slug: String(formData.get("slug")),
    nom: String(formData.get("nom")),
    region: String(formData.get("region")),
    resume: String(formData.get("resume")),
    histoire: String(formData.get("histoire")),
    patrimoine: String(formData.get("patrimoine")),
    latitude: Number(formData.get("latitude")) || null,
    longitude: Number(formData.get("longitude")) || null,
    image: String(formData.get("image")),
  };

  if (id) {
    await supabase.from("villages").update(payload).eq("id", Number(id));
  } else {
    await supabase.from("villages").insert(payload);
  }

  return { success: true };
}

export default async function VillageFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const router = useRouter();
  const isNew = id === "new";
  const [image, setImage] = useState("");

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">
        {isNew ? "Ajouter un village" : "Modifier le village"}
      </h1>

      <form action={saveVillage} className="mt-8 space-y-6 max-w-2xl">
        <input type="hidden" name="id" defaultValue={isNew ? "" : id} />

        <div>
          <label className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            name="nom"
            required
            className="mt-1.5 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Slug</label>
          <input
            name="slug"
            required
            className="mt-1.5 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Région</label>
          <input
            name="region"
            className="mt-1.5 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Résumé</label>
          <textarea
            name="resume"
            rows={3}
            className="mt-1.5 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Histoire</label>
          <textarea
            name="histoire"
            rows={4}
            className="mt-1.5 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Patrimoine</label>
          <textarea
            name="patrimoine"
            rows={4}
            className="mt-1.5 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Latitude</label>
          <input
            name="latitude"
            type="number"
            step="any"
            className="mt-1.5 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Longitude</label>
          <input
            name="longitude"
            type="number"
            step="any"
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
          <Link
            href="/admin/villages"
            className="rounded-full border px-6 py-3 text-sm font-medium transition-colors hover:bg-gray-50"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}
