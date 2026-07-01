import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact | Ivoire-Tour Village",
  description:
    "Contactez l'association Ivoire-Tour Village : partenariats, villages, sponsors ou demandes d'information.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-3xl font-bold sm:text-4xl">Nous contacter</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Une question, un partenariat, ou votre village souhaite rejoindre la
        plateforme ? Écrivez-nous.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">
                contact@ivoiretourvillage.org
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
            <div>
              <p className="text-sm font-medium">Téléphone / WhatsApp</p>
              <p className="text-sm text-muted-foreground">
                À définir avec l&apos;association
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
            <div>
              <p className="text-sm font-medium">Zone d&apos;intervention</p>
              <p className="text-sm text-muted-foreground">
                Villages touristiques de Côte d&apos;Ivoire
              </p>
            </div>
          </div>
          <p className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
            Coordonnées provisoires, à mettre à jour dès l&apos;activation du
            nom de domaine et des canaux officiels de l&apos;association.
          </p>
        </div>
      </div>
    </div>
  );
}
