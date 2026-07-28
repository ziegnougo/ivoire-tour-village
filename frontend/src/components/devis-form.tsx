"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { createDevisRequestUnified } from "@/lib/data";

export function DevisForm({ offre }: { offre: Offre }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const personnes = formData.get("personnes");
    const dateSouhaitee = String(formData.get("date-souhaitee") ?? "");
    const message = String(formData.get("message") ?? "");

    try {
      await createDevisRequestUnified({
        offre_slug: offre.slug,
        nom: String(formData.get("nom")),
        email: String(formData.get("email")),
        telephone: String(formData.get("telephone")),
        nombre_personnes: personnes ? Number(personnes) : undefined,
        date_souhaitee: dateSouhaitee || undefined,
        message: message || undefined,
      });
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Une erreur est survenue, veuillez réessayer."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <h2 className="text-xl font-semibold text-emerald-800">
          Demande envoyée !
        </h2>
        <p className="mt-2 text-sm text-emerald-700">
          Votre demande de devis pour « {offre.titre} » a bien été
          enregistrée. Notre équipe vous recontactera sous 48h.
        </p>
        <Link
          href={`/offres/${offre.slug}`}
          className="mt-6 inline-block rounded-full bg-emerald-700 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
        >
          Retour à l&apos;offre
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium" htmlFor="nom">
            Nom complet
          </label>
          <input
            id="nom"
            name="nom"
            required
            className="mt-1.5 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
          />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="telephone">
            Téléphone
          </label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            required
            className="mt-1.5 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1.5 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium" htmlFor="personnes">
            Nombre de personnes
          </label>
          <input
            id="personnes"
            name="personnes"
            type="number"
            min={1}
            max={offre.placesDisponibles}
            defaultValue={1}
            required
            className="mt-1.5 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
          />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="date-souhaitee">
            Date souhaitée
          </label>
          <input
            id="date-souhaitee"
            name="date-souhaitee"
            type="date"
            className="mt-1.5 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium" htmlFor="message">
          Message (optionnel)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Précisez vos besoins ou contraintes particulières..."
          className="mt-1.5 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-emerald-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-800 disabled:opacity-60"
      >
        {submitting ? "Envoi..." : "Envoyer la demande de devis"}
      </button>
    </form>
  );
}
