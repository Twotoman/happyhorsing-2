"use client";

import { useState, ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HorseForm } from "./HorseForm";

interface AddHorseSheetProps {
  userId: string;
  children: ReactNode; // Das hier erlaubt uns, das Design von außen zu bestimmen
}

export function AddHorseSheet({ userId, children }: AddHorseSheetProps) {

  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Füge ein neues Pferd hinzu</SheetTitle>
          <SheetDescription>
            Fülle die Felder aus, um ein neues Pferd hinzuzufügen.
          </SheetDescription>
        </SheetHeader>

        <HorseForm userId={userId} onSuccess={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}