import { Injectable } from '@nestjs/common';
import { LogType } from 'src/domain/enums/log-type.enum';
import { LoggerRepository } from 'src/infrastructure/repository/logger.repository';

@Injectable()
export class LoggerService {
  constructor(private readonly logger: LoggerRepository) {}

  async logTechnical(action: string, message: string, type: LogType, userId?: number): Promise<void> {
    try {
      await this.logger.logTechnical(action, message, type, userId);
    } catch (error) {
        console.error(error);
    }
  }

  async logFunctional(action: string, message: string, userId?: number): Promise<void> {
    await this.logger.logFunctional(action, message, userId);
  }
}
