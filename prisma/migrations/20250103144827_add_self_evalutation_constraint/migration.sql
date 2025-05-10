/*
  Warnings:

  - A unique constraint covering the columns `[participantId,categoryId]` on the table `SelfEvaluation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ParticipantChallengeProgression" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "order" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "SelfEvaluation_participantId_categoryId_key" ON "SelfEvaluation"("participantId", "categoryId");
