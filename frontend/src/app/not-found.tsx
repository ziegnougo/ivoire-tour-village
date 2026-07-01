import Image from "next/image";
import Link from "next/link";
import logo from "../../public/brand/logo.png";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <Image
        src={logo}
        alt="Ivoire-Tour Village"
        className="h-20 w-20 object-contain opacity-80"
      />
      <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-emerald-700">
        Erreur 404
      </p>
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
        Cette page s&apos;est perdue en chemin
      </h1>
      <p className="mt-4 text-muted-foreground">
        La page que vous cherchez n&apos;existe pas ou plus. Retournez
        explorer nos villages et offres.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-emerald-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
        >
          Retour à l&apos;accueil
        </Link>
        <Link
          href="/villages"
          className="rounded-full border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
        >
          Voir les villages
        </Link>
      </div>
    </div>
  );
}
