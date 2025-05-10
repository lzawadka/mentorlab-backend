/*
  Warnings:

  - Made the column `type` on table `Campaign` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Campaign" ALTER COLUMN "type" SET NOT NULL,
ALTER COLUMN "type" DROP DEFAULT;
