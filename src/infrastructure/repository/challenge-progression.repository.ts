import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChallengeProgressionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async bulkInsert(challenges: { participantId: number; campaignId: number; challengeId: number; status: string }[]): Promise<void> {
    if (!challenges || challenges.length === 0)
      throw new Error('No challenges provided for bulk insertion.');

    await this.prisma.participantChallengeProgression.createMany({
      data: challenges,
      skipDuplicates: true,
    });
  }

  async deleteOldChallenges(participantId: number, campaignId: number): Promise<void> {
    await this.prisma.participantChallengeProgression.deleteMany({
        where: {
            participantId,
            campaignId,
            status: { not: 'COMPLETED' }
        }
    });
  }


  async findByUserAndCampaign(userId: number, campaignId: number) {
    return this.prisma.participantChallengeProgression.findMany({
      where: { 
        campaignId,
        participant: {
          userId
        } 
      },
      include: { challenge: true, participant: true },
    });
  }

  // Récupérer toutes les progressions pour un participant
  async findByUserCampaignAndChallenge(
    userId: number, 
    challengeId: number, 
    campaignId: number
  ) {
    return await this.prisma.participantChallengeProgression.findFirst({
      where: {
        challengeId,
        campaignId,
        participant: {
          userId: userId,
        },
      },
      include: {
        challenge: true,
      },
    });
  }

  // Mettre à jour une progression
  async update(id: number, data: any) {
    return this.prisma.participantChallengeProgression.update({
      where: { id },
      data,
    });
  }

  // Supprimer une progression (si nécessaire)
  async delete(id: number) {
    return this.prisma.participantChallengeProgression.delete({
      where: { id },
    });
  }
}
