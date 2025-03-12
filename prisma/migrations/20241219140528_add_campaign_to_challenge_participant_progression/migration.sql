/*
  Warnings:

  - A unique constraint covering the columns `[participantId,campaignId]` on the table `ParticipantCampaignProgress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ParticipantCampaignProgress_participantId_campaignId_key" ON "ParticipantCampaignProgress"("participantId", "campaignId");
