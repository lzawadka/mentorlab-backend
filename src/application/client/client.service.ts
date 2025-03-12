import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateClientRequestDto } from 'src/application/client/dto/request/update-client-request.dto';
import { CreateUserRequestDto } from 'src/application/client/dto/request/create-client-request.dto';
import { ClientRepository } from 'src/infrastructure/repository/client.repository';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async createClient(data: CreateUserRequestDto) {
    return this.clientRepository.createClient(data);
  }

  async getAllClients() {
    return this.clientRepository.findAll();
  }

  async getClientById(id: number) {
    const client = await this.clientRepository.findById(id);
    if (!client) 
      throw new NotFoundException(`Client with ID ${id} not found`);

    return client;
  }

  async updateClient(id: number, data: UpdateClientRequestDto) {
    const client = await this.clientRepository.updateClient(id, data);
    if (!client) 
      throw new NotFoundException(`Client with ID ${id} not found`);

    return client;
  }

  async deleteClient(id: number): Promise<void> {
    await this.clientRepository.deleteClient(id);
  }
}
