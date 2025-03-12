/*
  Warnings:

  - A unique constraint covering the columns `[challengeId,categoryId]` on the table `ChallengeCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ChallengeCategory_challengeId_categoryId_key" ON "ChallengeCategory"("challengeId", "categoryId");
