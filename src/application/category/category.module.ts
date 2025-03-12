import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { LoggerService } from 'src/shared/logging/logger.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, LoggerService],
  exports: [CategoryService],
})
export class CategoryModule {}
