import Link from "next/link";

const links = [
  { href: "/villages", label: "Villages" },
  { href: "/offres", label: "Offres" },
  { href: "/#a-propos", label: "À propos" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-lg text-emerald-700">IVOIRE-TOUR</span>
          <span className="text-lg text-orange-500">VILLAGE</span>
        </Link>
        <nav className="hidden gap-6 text-sm font-medium sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/offres"
          className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
        >
          Réserver
        </Link>
      </div>
    </header>
  );
}
