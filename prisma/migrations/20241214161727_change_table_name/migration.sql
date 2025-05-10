/*
  Warnings:

  - You are about to drop the `ChallengeParticipantCompletion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChallengeParticipantCompletion" DROP CONSTRAINT "ChallengeParticipantCompletion_challengeId_fkey";

-- DropForeignKey
ALTER TABLE "ChallengeParticipantCompletion" DROP CONSTRAINT "ChallengeParticipantCompletion_participantId_fkey";

-- DropTable
DROP TABLE "ChallengeParticipantCompletion";

-- CreateTable
CREATE TABLE "ChallengeParticipantProgression" (
    "id" SERIAL NOT NULL,
    "participantId" INTEGER NOT NULL,
    "challengeId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "ChallengeParticipantProgression_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChallengeParticipantProgression" ADD CONSTRAINT "ChallengeParticipantProgression_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChallengeParticipantProgression" ADD CONSTRAINT "ChallengeParticipantProgression_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;
