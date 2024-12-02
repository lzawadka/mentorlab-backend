-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "type" TEXT;

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 1;
