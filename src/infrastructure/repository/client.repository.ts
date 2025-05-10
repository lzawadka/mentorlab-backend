import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createClient(data: { name: string; description?: string; contactEmail: string }) {
    return this.prisma.client.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.client.findMany();
  }

  async findById(id: number) {
    return this.prisma.client.findUnique({
      where: { id },
    });
  }

  async updateClient(id: number, data: { name?: string; description?: string; contactEmail?: string }) {
    return this.prisma.client.update({
      where: { id },
      data,
    });
  }

  async deleteClient(id: number): Promise<void> {
    this.prisma.client.delete({
      where: { id },
    });
  }
}
