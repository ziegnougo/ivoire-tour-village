"use client";

import type { ReactNode } from "react";
import { FavoritesProvider } from "@/lib/favorites-context";

export function Providers({ children }: { children: ReactNode }) {
  return <FavoritesProvider>{children}</FavoritesProvider>;
}
