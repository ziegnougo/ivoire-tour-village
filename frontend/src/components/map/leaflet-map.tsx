"use client";

import { useEffect } from "react";
import Link from "next/link";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import type { Village } from "@/lib/supabase/types";

let iconsConfigured = false;
function configureDefaultIcon() {
  if (iconsConfigured) return;
  iconsConfigured = true;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x.src,
    iconUrl: markerIcon.src,
    shadowUrl: markerShadow.src,
  });
}

export function LeafletMap({
  villages,
  center,
  zoom = 7,
  height = 420,
}: {
  villages: Village[];
  center?: [number, number];
  zoom?: number;
  height?: number;
}) {
  useEffect(() => {
    configureDefaultIcon();
  }, []);

  const mapCenter: [number, number] =
    center ??
    (villages.length > 0
      ? [villages[0].coordonnees.lat, villages[0].coordonnees.lng]
      : [7.54, -5.55]);

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height, width: "100%", borderRadius: "0.75rem" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {villages.map((village) => (
        <Marker
          key={village.slug}
          position={[village.coordonnees.lat, village.coordonnees.lng]}
        >
          <Popup>
            <p className="font-semibold">{village.nom}</p>
            <p className="text-sm text-muted-foreground">{village.region}</p>
            <Link
              href={`/villages/${village.slug}`}
              className="text-sm font-medium text-emerald-700 hover:underline"
            >
              Voir la fiche →
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
