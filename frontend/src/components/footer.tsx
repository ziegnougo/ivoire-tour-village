import Image from "next/image";
import logo from "../../public/brand/logo.png";

export function Footer() {
  return (
    <footer id="a-propos" className="mt-auto border-t bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted-foreground">
        <div className="flex items-center gap-3">
          <Image
            src={logo}
            alt="Ivoire-Tour Village"
            className="h-10 w-10 object-contain"
          />
          <p className="font-semibold text-foreground">IVOIRE-TOUR VILLAGE</p>
        </div>
        <p className="mt-4 max-w-2xl">
          Association de numérisation des villages touristiques de Côte
          d&apos;Ivoire — promotion du patrimoine, réservation d&apos;expériences
          de camping et accompagnement des communautés locales.
        </p>
        <p className="mt-6">
          © {new Date().getFullYear()} Association Ivoire-Tour Village. Tous
          droits réservés.
        </p>
      </div>
    </footer>
  );
}
