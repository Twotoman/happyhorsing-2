// lib/actions/horses.ts
"use server";

import { revalidatePath } from "next/cache";
import { createHorseInDB, deleteHorseDB } from "@/lib/db/horses";
import { supabase } from "@/lib/db/supabase"; // Für den Datei-Upload

export async function createHorseAction(formData: FormData) {
  const name = formData.get("name") as string;
  const breed = formData.get("breed") as string;
  const userId = formData.get("userId") as string;
  const file = formData.get("image") as File | null;

  try {
    let imageUrl = null;

    // Datei-Upload Logik (gehört in die Action, da sie Teil der Request-Verarbeitung ist)
    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const fileName = `${userId}/${Date.now()}-${file.name}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("horse-pictures")
        .upload(fileName, arrayBuffer, {
          contentType: file.type,
          upsert: true
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("horse-pictures")
        .getPublicUrl(fileName);
        
      imageUrl = urlData.publicUrl;
    }

    // DB-Layer aufrufen
    await createHorseInDB({
      name,
      breed,
      ownerId: userId,
      imageUrl
    });

    revalidatePath("/horses");
    return { success: true };
  } catch (error) {
    console.error("Action Error:", error);
    return { success: false };
  }
}

export async function deleteHorseAction(id: string, userId: string) {
  try {
    await deleteHorseDB(id, userId);
    revalidatePath("/horses");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Fehler beim Löschen" };
  }
}