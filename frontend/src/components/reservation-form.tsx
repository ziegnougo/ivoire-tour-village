"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { createReservationUnified } from "@/lib/data";

const formatPrix = (prix: number) =>
  new Intl.NumberFormat("fr-FR").format(prix) + " FCFA";

export function ReservationForm({ offre }: { offre: Offre }) {
  const [personnes, setPersonnes] = useState(1);
  const [date, setDate] = useState("");
  const [confirmation, setConfirmation] = useState<{
    reference: string;
    date: string;
    personnes: number;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = personnes * offre.prix;

  const minDate = useMemo(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().slice(0, 10);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      const reservation = await createReservationUnified({
        offre_slug: offre.slug,
        nom: String(formData.get("nom")),
        email: String(formData.get("email")),
        date_experience: date,
        nombre_personnes: personnes,
      });
      setConfirmation({ reference: (reservation as any).reference, date, personnes });
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

  if (confirmation) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <h2 className="text-xl font-semibold text-emerald-800">
          Réservation confirmée !
        </h2>
        <p className="mt-2 text-sm text-emerald-700">
          Votre réservation pour « {offre.titre} » le{" "}
          {new Date(confirmation.date).toLocaleDateString("fr-FR")} pour{" "}
          {confirmation.personnes} personne
          {confirmation.personnes > 1 ? "s" : ""} est enregistrée.
        </p>
        <p className="mt-4 inline-block rounded-lg border border-emerald-300 bg-white px-4 py-2 font-mono text-sm font-semibold tracking-wider text-emerald-800">
          {confirmation.reference}
        </p>
        <p className="mt-3 text-xs text-emerald-700">
          Conservez cette référence : votre billet électronique et QR code
          vous seront envoyés par email une fois le paiement en ligne
          disponible.
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium" htmlFor="date">
            Date de l&apos;expérience
          </label>
          <input
            id="date"
            type="date"
            required
            min={minDate}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1.5 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
          />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="personnes">
            Nombre de personnes
          </label>
          <input
            id="personnes"
            type="number"
            min={1}
            max={offre.placesDisponibles}
            value={personnes}
            onChange={(e) =>
              setPersonnes(
                Math.min(
                  offre.placesDisponibles,
                  Math.max(1, Number(e.target.value) || 1)
                )
              )
            }
            required
            className="mt-1.5 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            {offre.placesDisponibles} places disponibles
          </p>
        </div>
      </div>

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

      <div className="rounded-xl border bg-muted/30 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Récapitulatif
        </h2>
        <div className="mt-3 space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Offre</span>
            <span>{offre.titre}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Prix unitaire</span>
            <span>{formatPrix(offre.prix)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Personnes</span>
            <span>× {personnes}</span>
          </div>
        </div>
        <div className="mt-3 flex justify-between border-t pt-3 text-base font-semibold">
          <span>Total</span>
          <span>{formatPrix(total)}</span>
        </div>
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
        {submitting ? "Confirmation..." : "Confirmer la réservation"}
      </button>
    </form>
  );
}
