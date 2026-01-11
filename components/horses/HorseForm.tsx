"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { horseSchema, HorseInput } from "@/schemas/horse";
import { createHorseAction } from "@/lib/actions/horses";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner"


export function HorseForm({ userId, onSuccess }: { userId: string, onSuccess: () => void }) {

  const [isPending, setIsPending] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<HorseInput>({
    resolver: zodResolver(horseSchema),
  });

  async function onSubmit(data: HorseInput) {
    setIsPending(true);
    
    // FormData erstellen, um Datei UND Text zu senden
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("breed", data.breed);
    formData.append("userId", userId);
    
    // Das File-Input manuell auslesen
    const file = data.image?.[0];
    console.log("file from RHF", file?.name, file?.type, file?.size);
    if (file) formData.append("image", file);

    try {
      const result = await createHorseAction(formData);
      if (result.success) onSuccess();
    } catch (error) {
      alert("Fehler beim Speichern");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid flex-1 auto-rows-min gap-6 px-4"> {/* (data,e) wird automatisch durch handleSubmit übergeben */}
      <div className="space-y-2">
        <Label>Name des Pferdes</Label>
        <Input {...register("name")} className={errors.name ? "text-accent" : ""} />
        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Rasse</Label>
        <Input {...register("breed")} className={errors.breed ? "text-accent" : ""} />
        {errors.breed && <p className="text-xs text-red-500">{errors.breed.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Foto</Label>
        <Input {...register("image")} name="image" type="file" accept="image/*" />
      </div>

      <Button type="submit" disabled={isPending} className="w-full bg-primary text-primary-foreground">
        {isPending ? <Spinner/> : "Speichern"}
      </Button>
    </form>
  );
}