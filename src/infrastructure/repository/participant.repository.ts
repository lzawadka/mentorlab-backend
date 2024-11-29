import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ParticipantRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findParticipantByIdAndCampaign(participantId: number, campaignId: number) {
    return this.prisma.participant.findFirst({
      where: { id: participantId, campaignId },
    });
  }

  async createParticipant(userId: number, campaignId: number, teamId?: number) {
    return this.prisma.participant.create({
      data: {
        userId,
        campaignId,
        teamId,
      },
    });
  }

  async findParticipantsByCampaign(campaignId: number) {
    return this.prisma.participant.findMany({
      where: { campaignId },
      include: { user: true, team: true },
    });
  }

  async findParticipantByUser(userId: number) {
    return this.prisma.participant.findFirst({
      where: { userId },
      include: { campaign: true },
    });
  }

  async deleteParticipant(participantId: number) {
    return this.prisma.participant.delete({
      where: { id: participantId },
    });
  }

  async createParticipants(participants: { userId: number; campaignId: number }[]) {
    const created = await Promise.all(
      participants.map((participant) =>
        this.prisma.participant.create({
          data: participant,
        }),
      ),
    );
    return created;
  }

  async findByIds(participantIds: number[]) {
    return this.prisma.participant.findMany({
      where: {
        id: { in: participantIds },
      },
    });
  }

  async updateParticipantTeam(participantId: number, teamId: number) {
    return this.prisma.participant.update({
      where: { id: participantId },
      data: { teamId },
    });
  }
}
