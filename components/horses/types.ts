import { Prisma } from '@/lib/generated/prisma/client'

export const horseCardSelect = {
  id: true,
  name: true,
  breed: true,
  imageUrl: true
} as const;

export type HorseCardData = Prisma.HorseGetPayload<{
  select: typeof horseCardSelect;
}>;