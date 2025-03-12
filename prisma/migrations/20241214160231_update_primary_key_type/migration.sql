/*
  Warnings:

  - The primary key for the `CampaignCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `CampaignCategory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ChallengeParticipantCompletion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ChallengeParticipantCompletion` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ParticipantCampaignProgress` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ParticipantCampaignProgress` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "CampaignCategory" DROP CONSTRAINT "CampaignCategory_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "CampaignCategory_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ChallengeParticipantCompletion" DROP CONSTRAINT "ChallengeParticipantCompletion_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ChallengeParticipantCompletion_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ParticipantCampaignProgress" DROP CONSTRAINT "ParticipantCampaignProgress_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ParticipantCampaignProgress_pkey" PRIMARY KEY ("id");
