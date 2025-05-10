/*
  Warnings:

  - The primary key for the `CampaignChallenge` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `CampaignChallenge` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Category` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Challenge` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Challenge` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ChallengeCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ChallengeCategory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `challengeId` on the `CampaignChallenge` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `categoryId` on the `ChallengeCategory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `challengeId` on the `ChallengeCategory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "CampaignChallenge" DROP CONSTRAINT "CampaignChallenge_challengeId_fkey";

-- DropForeignKey
ALTER TABLE "ChallengeCategory" DROP CONSTRAINT "ChallengeCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ChallengeCategory" DROP CONSTRAINT "ChallengeCategory_challengeId_fkey";

-- AlterTable
ALTER TABLE "CampaignChallenge" DROP CONSTRAINT "CampaignChallenge_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "challengeId",
ADD COLUMN     "challengeId" INTEGER NOT NULL,
ADD CONSTRAINT "CampaignChallenge_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Challenge" DROP CONSTRAINT "Challenge_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ChallengeCategory" DROP CONSTRAINT "ChallengeCategory_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "categoryId",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
DROP COLUMN "challengeId",
ADD COLUMN     "challengeId" INTEGER NOT NULL,
ADD CONSTRAINT "ChallengeCategory_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "CampaignChallenge" ADD CONSTRAINT "CampaignChallenge_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChallengeCategory" ADD CONSTRAINT "ChallengeCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChallengeCategory" ADD CONSTRAINT "ChallengeCategory_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;
