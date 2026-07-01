import Image from "next/image";
import Link from "next/link";
import logo from "../../public/brand/logo.png";

const liens = [
  { href: "/villages", label: "Villages" },
  { href: "/offres", label: "Offres" },
  { href: "/formation", label: "Formation" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted-foreground">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <Image
                src={logo}
                alt="Ivoire-Tour Village"
                className="h-10 w-10 object-contain"
              />
              <p className="font-semibold text-foreground">
                IVOIRE-TOUR VILLAGE
              </p>
            </div>
            <p className="mt-4">
              Association de numérisation des villages touristiques de Côte
              d&apos;Ivoire — promotion du patrimoine, réservation
              d&apos;expériences de camping et accompagnement des communautés
              locales.
            </p>
          </div>

          <nav className="flex flex-col gap-2 sm:items-end">
            {liens.map((lien) => (
              <Link
                key={lien.href}
                href={lien.href}
                className="transition-colors hover:text-foreground"
              >
                {lien.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-8 border-t pt-6">
          © {new Date().getFullYear()} Association Ivoire-Tour Village. Tous
          droits réservés.
        </p>
      </div>
    </footer>
  );
}
