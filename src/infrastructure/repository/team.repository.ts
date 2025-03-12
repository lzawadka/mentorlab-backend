import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateTeamRequestDto } from 'src/application/team/dto/request/update-team-request.dto';
import { Team } from 'src/domain/entities/team.entity';

@Injectable()
export class TeamRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTeam(name: string, campaignId: number, points: number = 0) {
    return this.prisma.team.create({
      data: {
        name,
        campaignId,
        points
      },
    });
  }

  async getByCampaignId(campaignId: number): Promise<any> {
    return this.prisma.team.findMany({
      where: { campaignId },
      include: {
        participants: {
          select: {
              id: true,
              userId: true,
              createdAt: true,
              user: {
                  select: {
                      id: true,
                      email: true,
                      firstName: true,
                      lastName: true,
                      role: true,
                  },
              },
          },
        },
      }
    });
  }

  async getById(id: number) {
    return this.prisma.team.findUnique({
      where: { id },
      include: {
        participants: {
          select: {
              id: true,
              userId: true,
              createdAt: true,
              user: {
                  select: {
                      id: true,
                      email: true,
                      firstName: true,
                      lastName: true,
                      role: true,
                  },
              },
          },
        },
      }
    });
  }

  async update(id: number, data: UpdateTeamRequestDto) {
    return this.prisma.team.update({
      where: { id },
      data: {
        name: data.name,
        campaignId: data.campaignId
      }
    });
  }

  async delete(id: number) {
    return this.prisma.team.delete({
      where: { id },
    });
  }
}
