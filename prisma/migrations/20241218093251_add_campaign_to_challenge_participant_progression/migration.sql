/*
  Warnings:

  - A unique constraint covering the columns `[participantId,challengeId,campaignId]` on the table `ChallengeParticipantProgression` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `campaignId` to the `ChallengeParticipantProgression` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChallengeParticipantProgression" ADD COLUMN     "campaignId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ChallengeParticipantProgression_participantId_challengeId_c_key" ON "ChallengeParticipantProgression"("participantId", "challengeId", "campaignId");

-- AddForeignKey
ALTER TABLE "ChallengeParticipantProgression" ADD CONSTRAINT "ChallengeParticipantProgression_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
