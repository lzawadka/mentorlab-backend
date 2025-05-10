import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from 'src/infrastructure/repository/category.repository';
import { GetCategoryResponseDto } from './dto/response/get-category-response.dto';
import { LoggerService } from 'src/shared/logging/logger.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly logger: LoggerService,
  ) {}

  async createCategory(name: string): Promise<GetCategoryResponseDto> {
    const category = this.categoryRepository.createCategory({ name });
    await this.logger.logFunctional('Category created', `Category ${name} created`);
    return category;
  }

  async getAllCategories(): Promise<GetCategoryResponseDto[]> {
    return this.categoryRepository.findAllCategories();
  }

  async getCategoryById(id: number): Promise<GetCategoryResponseDto> {
    const category = await this.categoryRepository.findCategoryById(id);
    if (!category)
      throw new NotFoundException(`Category with ID ${id} not found`);
    return category;
  }

  async deleteCategory(id: number): Promise<void> {
    await this.getCategoryById(id); 
    this.categoryRepository.deleteCategory(id);
    await this.logger.logFunctional('Category deleted', `Category ${id} deleted`);
  }
}
