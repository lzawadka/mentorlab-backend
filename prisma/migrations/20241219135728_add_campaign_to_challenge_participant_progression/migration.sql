/*
  Warnings:

  - You are about to drop the `ChallengeParticipantProgression` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChallengeParticipantProgression" DROP CONSTRAINT "ChallengeParticipantProgression_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "ChallengeParticipantProgression" DROP CONSTRAINT "ChallengeParticipantProgression_challengeId_fkey";

-- DropForeignKey
ALTER TABLE "ChallengeParticipantProgression" DROP CONSTRAINT "ChallengeParticipantProgression_participantId_fkey";

-- DropTable
DROP TABLE "ChallengeParticipantProgression";

-- CreateTable
CREATE TABLE "ParticipantChallengeProgression" (
    "id" SERIAL NOT NULL,
    "participantId" INTEGER NOT NULL,
    "challengeId" INTEGER NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "ParticipantChallengeProgression_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ParticipantChallengeProgression_participantId_challengeId_c_key" ON "ParticipantChallengeProgression"("participantId", "challengeId", "campaignId");

-- AddForeignKey
ALTER TABLE "ParticipantChallengeProgression" ADD CONSTRAINT "ParticipantChallengeProgression_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantChallengeProgression" ADD CONSTRAINT "ParticipantChallengeProgression_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantChallengeProgression" ADD CONSTRAINT "ParticipantChallengeProgression_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
