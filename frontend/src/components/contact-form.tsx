"use client";

import { useState, type FormEvent } from "react";
import { createContactMessage } from "@/lib/data";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      await createContactMessage({
        nom: String(formData.get("nom")),
        email: String(formData.get("email")),
        sujet: String(formData.get("sujet")),
        message: String(formData.get("message")),
      });
      setSubmitted(true);
    } catch {
      setError("Une erreur est survenue, veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <h2 className="text-xl font-semibold text-emerald-800">
          Message envoyé !
        </h2>
        <p className="mt-2 text-sm text-emerald-700">
          Merci pour votre message, notre équipe vous répondra dans les
          meilleurs délais.
        </p>
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
      </div>

      <div>
        <label className="text-sm font-medium" htmlFor="sujet">
          Sujet
        </label>
        <select
          id="sujet"
          name="sujet"
          className="mt-1.5 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
        >
          <option>Demande d&apos;information</option>
          <option>Partenariat / sponsoring</option>
          <option>Un village souhaitant rejoindre la plateforme</option>
          <option>Support technique</option>
          <option>Autre</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
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
        {submitting ? "Envoi..." : "Envoyer le message"}
      </button>
    </form>
  );
}
