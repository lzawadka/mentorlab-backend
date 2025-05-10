import { Injectable } from "@nestjs/common";
import { LogType } from "src/domain/enums/log-type.enum";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class LoggerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async logTechnical(action: string, message: string, type: LogType, userId?: number): Promise<void> {
      await this.prisma.logTechnical.create({
        data: { action, message, type, userId },
      });
    }
  
    async logFunctional(action: string, message: string, userId?: number): Promise<void> {
      await this.prisma.logFunctional.create({
        data: { action, message, userId },
      });
    }

    async getFunctionalLogs(page: number, limit: number) {
        const offset = (page - 1) * limit;
      
        return await this.prisma.logFunctional.findMany({
          skip: offset,
          take: limit,
          orderBy: { timestamp: "desc" },
        });
      }
      
    async getTechnicalLogs(page: number, limit: number) {
        const offset = (page - 1) * limit;
      
        return await this.prisma.logTechnical.findMany({
          skip: offset,
          take: limit,
          orderBy: { timestamp: "desc" },
        });
      }
      
}