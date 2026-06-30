"use client";

import dynamic from "next/dynamic";
import type { Village } from "@/lib/data";

const LeafletMap = dynamic(
  () => import("./leaflet-map").then((mod) => mod.LeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[420px] w-full items-center justify-center rounded-xl border bg-muted/30 text-sm text-muted-foreground">
        Chargement de la carte…
      </div>
    ),
  }
);

export function VillageMap(props: {
  villages: Village[];
  center?: [number, number];
  zoom?: number;
  height?: number;
}) {
  return <LeafletMap {...props} />;
}
