import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientRepository } from '../../infrastructure/repository/client.repository';
import { GetUserResponseDto } from 'src/application/dto/user/response/get-user-response.dto';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  // Créer un nouveau client
  async createClient(data: { name: string; description?: string; contactEmail: string }) {
    return this.clientRepository.createClient(data);
  }

  // Récupérer tous les clients
  async getAllClients() {
    return this.clientRepository.findAll();
  }

  // Récupérer un client par ID
  async getClientById(id: number) {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return client;
  }

  // Mettre à jour un client
  async updateClient(id: number, data: { name?: string; description?: string; contactEmail?: string }) {
    const client = await this.clientRepository.updateClient(id, data);
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return client;
  }

  // Supprimer un client
  async deleteClient(id: number) {
    const deletedClient = await this.clientRepository.deleteClient(id);
    if (!deletedClient) throw new NotFoundException(`Client with ID ${id} not found`);
    return deletedClient;
  }
}
