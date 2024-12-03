import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ClientService } from 'src/domain/services/client.service';
import { CreateUserRequestDto } from '../dto/client/request/create-client-request.dto';
import { UpdateClientRequestDto } from '../dto/client/request/update-client-request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiOperation({ summary: "Create a new client" })
  @ApiResponse({
      status: 201,
      description: 'Client successfully created',
  })
  @ApiResponse({
      status: 400,
      description: 'Bad request or validation error',
  })
  @Post()
  async createClient(@Body() data: CreateUserRequestDto) {
      return this.clientService.createClient(data);
  }

  @ApiOperation({ summary: "Retrieve all clients" })
  @ApiResponse({
      status: 200,
      description: 'List of clients retrieved successfully',
  })
  @Get()
  async getAllClients() {
      return this.clientService.getAllClients();
  }

  @ApiOperation({ summary: "Fetch a client by ID" })
  @ApiResponse({
      status: 200,
      description: 'Client found',
  })
  @ApiResponse({
      status: 404,
      description: 'Client not found',
  })
  @Get(':id')
  async getClientById(@Param('id') id: number) {
      return this.clientService.getClientById(Number(id));
  }

  @ApiOperation({ summary: "Update an existing client" })
  @ApiResponse({
      status: 200,
      description: 'Client successfully updated',
  })
  @ApiResponse({
      status: 404,
      description: 'Client not found',
  })
  @Put(':id')
  async updateClient(@Param('id') id: number, @Body() data: UpdateClientRequestDto) {
      return this.clientService.updateClient(Number(id), data);
  }

  @ApiOperation({ summary: "Delete a client" })
  @ApiResponse({
      status: 200,
      description: 'Client successfully deleted',
  })
  @ApiResponse({
      status: 404,
      description: 'Client not found',
  })
  @Delete(':id')
  async deleteClient(@Param('id') id: number) {
      return this.clientService.deleteClient(Number(id));
  }
}
