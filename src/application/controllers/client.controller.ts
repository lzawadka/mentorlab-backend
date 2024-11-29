import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ClientService } from 'src/domain/services/client.service';
import { CreateUserRequestDto } from '../dto/client/request/create-client-request.dto';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  // Endpoint pour créer un nouveau client
  @Post()
  async createClient(@Body() data: CreateUserRequestDto) {
    return this.clientService.createClient(data);
  }

  // Endpoint pour récupérer tous les clients
  @Get()
  async getAllClients() {
    return this.clientService.getAllClients();
  }

  // Endpoint pour récupérer un client spécifique par ID
  @Get(':id')
  async getClientById(@Param('id') id: string) {
    return this.clientService.getClientById(Number(id));
  }

  // Endpoint pour mettre à jour un client
  @Put(':id')
  async updateClient(@Param('id') id: string, @Body() data: { name?: string; description?: string; contactEmail?: string }) {
    return this.clientService.updateClient(Number(id), data);
  }

  // Endpoint pour supprimer un client
  @Delete(':id')
  async deleteClient(@Param('id') id: string) {
    return this.clientService.deleteClient(Number(id));
  }
}
