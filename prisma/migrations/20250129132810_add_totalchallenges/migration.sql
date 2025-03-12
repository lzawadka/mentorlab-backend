/*
  Warnings:

  - You are about to drop the column `order` on the `ParticipantChallengeProgression` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "totalChallenges" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ParticipantChallengeProgression" DROP COLUMN "order";
