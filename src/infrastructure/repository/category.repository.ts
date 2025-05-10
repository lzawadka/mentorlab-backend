import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Category } from "src/domain/entities/category.entity";

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(data: { name: string }) {
    return this.prisma.category.create({ data });
  }

  async findAllCategories() {
    return this.prisma.category.findMany();
  }

  async findCategoryById(id: number) {
    return this.prisma.category.findUnique({ where: { id } });
  }

  async findCategoryByIds(ids: number[]): Promise<Category[]> {
    return await this.prisma.category.findMany({
      where: { id: { in: ids } },
    }) || [];
  }

  async deleteCategory(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }
}