"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import logo from "../../public/brand/logo.png";

const links = [
  { href: "/villages", label: "Villages" },
  { href: "/offres", label: "Offres" },
  { href: "/formation", label: "Formation" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <Image
            src={logo}
            alt="Ivoire-Tour Village"
            className="h-12 w-12 object-contain"
            priority
          />
          <span className="hidden text-sm font-semibold leading-tight sm:block">
            <span className="block text-emerald-700">IVOIRE-TOUR</span>
            <span className="block text-orange-500">VILLAGE</span>
          </span>
        </Link>

        <nav className="hidden gap-6 text-sm font-medium lg:flex">
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

        <div className="flex items-center gap-2">
          <Link
            href="/offres"
            className="hidden rounded-full bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800 sm:block"
          >
            Réserver
          </Link>
          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t bg-background lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 text-sm font-medium">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/offres"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-emerald-700 px-4 py-2.5 text-center font-medium text-white transition-colors hover:bg-emerald-800"
            >
              Réserver
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
