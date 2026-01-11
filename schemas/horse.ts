import { z } from "zod";

export const horseSchema = z.object({
  name: z.string().min(2, "Name zu kurz"),
  breed: z.string().min(2, "Rasse fehlt"),

  // FileInput → kommt als FileList
  image: z.any().optional(),
});

export type HorseInput = z.infer<typeof horseSchema>;