import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClientRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Créer un client
  async createClient(data: { name: string; description?: string; contactEmail: string }) {
    return this.prisma.client.create({
      data,
    });
  }

  // Récupérer tous les clients
  async findAll() {
    return this.prisma.client.findMany();
  }

  // Récupérer un client par ID
  async findById(id: number) {
    return this.prisma.client.findUnique({
      where: { id },
    });
  }

  // Mettre à jour un client
  async updateClient(id: number, data: { name?: string; description?: string; contactEmail?: string }) {
    return this.prisma.client.update({
      where: { id },
      data,
    });
  }

  // Supprimer un client
  async deleteClient(id: number) {
    return this.prisma.client.delete({
      where: { id },
    });
  }
}
