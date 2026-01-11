// components/horses/HorseCard.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth/auth";
import { HorseCardData } from "./types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Utensils, Dumbbell } from "lucide-react";
import { Icon } from "lucide-react";
import { horseHead } from "@lucide/lab";
import HorseCardDropDownMenu from "./HorseCardDropDownMenu";
import { redirect } from "next/navigation";

export function HorseIcon() {
  return <Icon iconNode={horseHead} size={24} />;
}

export async function HorseCard({ horse }: { horse: HorseCardData }) {

  const session = await auth();
  
  if (!session?.user) redirect("/login")
  const userId = session?.user?.id;

  return (
<Card className="w-full bg-card text-card-foreground">
  <CardContent className="p-5">
    <div className="flex gap-4">
      <div className="relative h-30 w-30 rounded-md bg-muted overflow-hidden">
        {horse.imageUrl ? (
          <Image
            src={horse.imageUrl}
            alt={horse.name ? `Foto von ${horse.name}` : "Pferd"}
            fill
            sizes="112px"
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <HorseIcon />
          </div>
        )}
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold leading-tight">{horse.name}</h3>
          <HorseCardDropDownMenu id={horse.id} userId={userId} />
        </div>

        <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Utensils size={14} className="text-chart-1"/>
            <span>Fütterung</span>
          </div>
          <div className="flex items-center gap-1">
            <Dumbbell size={14} className="text-chart-2"/>
            <span>Training</span>
          </div>
        </div>
      </div>
    </div>
  </CardContent>
      <CardFooter className="p-5 pt-0 flex gap-2">
        <Link 
          href={`/dashboard/horses/${horse.id}`} 
          className="flex-1 bg-muted hover:bg-muted/80 text-foreground py-2.5 rounded-xl text-center text-sm font-semibold transition-colors"
        >
          Details
        </Link>
        <Link 
          href={`/dashboard/horses/${horse.id}/feeding`}
          className="bg-chart-2 hover:brightness-95 p-2.5 rounded-xl transition-all"
          title="Ernährung anpassen"
        >
          <Utensils size={18} />
        </Link>
      </CardFooter>
    </Card>
  );
}