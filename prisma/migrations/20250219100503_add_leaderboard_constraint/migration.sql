/*
  Warnings:

  - A unique constraint covering the columns `[campaignId,participantId]` on the table `Leaderboard` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[campaignId,teamId]` on the table `Leaderboard` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Leaderboard_campaignId_participantId_key" ON "Leaderboard"("campaignId", "participantId");

-- CreateIndex
CREATE UNIQUE INDEX "Leaderboard_campaignId_teamId_key" ON "Leaderboard"("campaignId", "teamId");
