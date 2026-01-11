/*
  Warnings:

  - You are about to drop the column `trainerId` on the `Horse` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Horse" DROP CONSTRAINT "Horse_trainerId_fkey";

-- AlterTable
ALTER TABLE "Horse" DROP COLUMN "trainerId";

-- CreateTable
CREATE TABLE "_TrainerRelation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TrainerRelation_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_RidersRelation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_RidersRelation_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TrainerRelation_B_index" ON "_TrainerRelation"("B");

-- CreateIndex
CREATE INDEX "_RidersRelation_B_index" ON "_RidersRelation"("B");

-- AddForeignKey
ALTER TABLE "_TrainerRelation" ADD CONSTRAINT "_TrainerRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Horse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TrainerRelation" ADD CONSTRAINT "_TrainerRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RidersRelation" ADD CONSTRAINT "_RidersRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Horse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RidersRelation" ADD CONSTRAINT "_RidersRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
