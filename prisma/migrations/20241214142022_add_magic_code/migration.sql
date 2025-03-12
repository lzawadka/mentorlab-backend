/*
  Warnings:

  - A unique constraint covering the columns `[magicCode]` on the table `Campaign` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "magicCode" VARCHAR(6) NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Campaign_magicCode_key" ON "Campaign"("magicCode");
