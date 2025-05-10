import { SelfEvaluation } from 'src/domain/entities/self-evaluation.entity';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SelfEvaluationRepository {
   constructor(private readonly prisma: PrismaService) {}

    async create(participantId: number, categoryId: number, score: number): Promise<SelfEvaluation> {
        return this.prisma.selfEvaluation.upsert({
            where: {
                participantId_categoryId: {
                    participantId: participantId,
                    categoryId: categoryId
                }
            },
            update: {
                score: score
            },
            create: {
                participantId: participantId,
                categoryId: categoryId,
                score: score
            }
        });
    }

    async findAllByParticipantId(participantId: number): Promise<any[]> {
        return await this.prisma.selfEvaluation.findMany({
            where: { participantId },
            include: { 
                category: true 
            },
        });
    }

    async findById(id: number): Promise<any | null> {
        return await this.prisma.selfEvaluation.findUnique({
            where: { id },
            include: { 
                category: true 
            },
        });
    }

    async update(id: number, data: Partial<SelfEvaluation>): Promise<any> {
        return await this.prisma.selfEvaluation.update({
            where: { id },
            data: {
                participantId: data.participantId,
                categoryId: data.categoryId,
                score: data.score,
            }
        });
    }

    async delete(id: number): Promise<any> {
        return await this.prisma.selfEvaluation.delete({
            where: { id },
        });
    }
}