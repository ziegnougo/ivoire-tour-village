"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/lib/favorites-context";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  slug,
  variant = "icon",
}: {
  slug: string;
  variant?: "icon" | "full";
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(slug);

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(slug);
        }}
        className={cn(
          "flex flex-1 items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted",
          active && "border-orange-500 text-orange-500"
        )}
      >
        <Heart className={cn("h-4 w-4", active && "fill-orange-500")} />
        {active ? "Dans vos favoris" : "Ajouter aux favoris"}
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={active ? "Retirer des favoris" : "Ajouter aux favoris"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(slug);
      }}
      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition-colors hover:bg-white"
    >
      <Heart
        className={cn(
          "h-4 w-4 text-foreground",
          active && "fill-orange-500 text-orange-500"
        )}
      />
    </button>
  );
}
