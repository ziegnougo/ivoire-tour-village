"use client";

import { useState, useRef } from "react";
import { Upload } from "lucide-react";

async function uploadImage(formData: FormData) {
  const file = formData.get("file") as File;
  const supabase = await import("@/lib/auth").then(m => m.getSupabaseAdmin());

  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
  const filePath = `images/${fileName}`;

  const { error } = await supabase.storage.from("images").upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    return { error: error.message };
  }

  const { data } = supabase.storage.from("images").getPublicUrl(filePath);
  return { url: data.publicUrl };
}

export function ImageUpload({ value, onChange }: { value?: string; onChange: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value || "");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.set("file", file);

    const result = await uploadImage(formData);
    if (result.error) {
      alert(result.error);
    } else if (result.url) {
      setPreview(result.url);
      onChange(result.url);
    }
    setUploading(false);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50 disabled:opacity-60"
        >
          <Upload className="h-4 w-4" />
          {uploading ? "Téléchargement..." : "Télécharger une image"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {preview && (
        <div className="flex items-center gap-4">
          <img
            src={preview}
            alt="Aperçu"
            className="h-20 w-20 rounded-lg object-cover"
          />
          <button
            type="button"
            onClick={() => {
              setPreview("");
              onChange("");
            }}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Supprimer
          </button>
        </div>
      )}
    </div>
  );
}
