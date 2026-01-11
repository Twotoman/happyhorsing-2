// lib/db/horses.ts
//TODO: Policies in Supabase besser verstehen und anpassen

import {supabase} from "@/lib/db/supabase"
import { prisma } from "@/db/client";
import { horseCardSelect, HorseCardData } from "@/components/horses/types";

export async function getHorseByIdDB(horseId: string, userId: string) {
  return await prisma.horse.findFirst({
    where: {
      id: horseId,
      ownerId: userId,
    },
  })
}

export async function getHorsesByUserIdDB(userId: string) {
  return await prisma.horse.findMany({
    where: { ownerId: userId },
    orderBy: { name: 'asc' },
  });
}

export async function getHorseCards(userId: string): Promise<HorseCardData[]> {
  return prisma.horse.findMany({
    where: { ownerId: userId },
    orderBy: { name: 'asc' },
    select: horseCardSelect,
  });
}

export async function deleteHorseDB(id: string, userId: string) {
  // 1. Erst das Pferd finden, um die Bild-URL zu erhalten
  const horse = await prisma.horse.findUnique({
    where: { id: id, ownerId: userId },
    select: { imageUrl: true }
  });

  // 2. Falls ein Bild existiert, aus Storage löschen
  if (horse?.imageUrl) {
    const fileName = horse.imageUrl.split('/').pop();
    if (fileName) {
      // Wichtig: Bucket Name prüfen (vorher hattest du 'horse-pictrues')
      await supabase.storage.from('horse-pictures').remove([fileName]);
    }
  }

  // 3. Aus der Datenbank löschen
  return await prisma.horse.delete({
    where: { id, ownerId: userId },
  });
}

export async function createHorseInDB(data: { 
  name: string; 
  breed: string; 
  ownerId: string; 
  imageUrl?: string | null 
}) {
  return await prisma.horse.create({
    data: {
      name: data.name,
      breed: data.breed,
      ownerId: data.ownerId,
      imageUrl: data.imageUrl,
    },
  });
}