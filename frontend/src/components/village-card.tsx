import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Village } from "@/lib/data";

export function VillageCard({ village }: { village: Village }) {
  return (
    <Link
      href={`/villages/${village.slug}`}
      className="group overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-lg"
    >
      <div className="relative h-48 w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={village.image}
          alt={village.nom}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge className="absolute left-3 top-3 bg-white/90 text-foreground hover:bg-white/90">
          {village.region}
        </Badge>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold">{village.nom}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {village.resume}
        </p>
      </div>
    </Link>
  );
}
