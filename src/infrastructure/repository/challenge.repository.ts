import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateChallengeRequestDto } from "src/application/challenge/dto/request/create-challenge-request.dto";
import { UpdateChallengeDto } from "src/application/challenge/dto/request/update-challenge-request.dto";

@Injectable()
export default class ChallengeRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createChallenge(data: CreateChallengeRequestDto) {
        const existingCategories = await this.prisma.category.findMany({
            where: { id: { in: data.categoryIds } },
          });
        
        if (existingCategories.length !== data.categoryIds.length) throw new NotFoundException('One or more categories do not exist');

        return this.prisma.challenge.create({
          data: {
            title: data.title,
            description: data.description,
            example: data.example,
            estimatedTime: data.estimatedTime,
            difficulty: data.difficulty,
            minThreshold: data.minThreshold,
            maxThreshold: data.maxThreshold,
            categories: {
              create: data.categoryIds.map((categoryId) => ({
                category: {
                  connect: { id: categoryId },
                },
              })),
            },
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          include: {
            categories: {
              include: {
                category: true,
              },
            },
          },
        });
    }
    
    async updateChallenge(id: number, data: UpdateChallengeDto) {
        const existingCategories = await this.prisma.category.findMany({
          where: { id: { in: data.categoryIds } },
        });
      
        if (existingCategories.length !== data.categoryIds.length) 
          throw new NotFoundException('One or more categories do not exist');
      
        return this.prisma.challenge.update({
          where: { id },
          data: {
              title: data.title,
              description: data.description,
              example: data.example,
              estimatedTime: data.estimatedTime,
              difficulty: data.difficulty,
              minThreshold: data.minThreshold,
              maxThreshold: data.maxThreshold,
              categories: {
                deleteMany: {},
                create: data.categoryIds.map((categoryId) => ({
                  category: {
                    connect: { id: categoryId },
                  },
                })),
              },
              updatedAt: new Date(),
          },
        });
    }
    
    async findAllChallenges() {
      return this.prisma.challenge.findMany({
        include: { 
          categories: { 
            include: { category: true }
          } 
        },
      });
    }

    async findChallengeById(id: number) {
      return this.prisma.challenge.findUnique({
          where: { id },
          include: { 
            categories: { 
              include: { 
                category: true 
              } 
            } 
          },
      });
    }

    async findChallengesByCategoryId(categoryId: number) {
      return this.prisma.challenge.findMany({
        where: {
          categories: {
            some: {
              categoryId: categoryId,
            },
          },
        },
      });
    }
    
    async findChallengesByCategoryIds(categoryIds: number[]) {
      return await this.prisma.challenge.findMany({
        where: {
          categories: {
            some: {
              categoryId: {
                in: categoryIds,
              },
            },
          },
        },
        include: {
          categories: {
            select: {
              category: true,
            },
          },
        },
      });
    }

    async findChallengesByCampaignId(campaignId: number) {
      return this.prisma.challenge.findMany({
        where: {
          campaigns: {
            some: {
              campaignId: campaignId,
            },
          },
        },
      });
    }

    async deleteChallenge(id: number) {
      return this.prisma.challenge.delete({ where: { id } });
    }
}