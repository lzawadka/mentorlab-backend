import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { RolesPermissionsGuard } from 'src/shared/guards/roles.guard';
import { UserRole } from 'src/domain/enums/user-role.enum';
import { ClientService } from './client.service';
import { CreateUserRequestDto } from './dto/request/create-client-request.dto';
import { UpdateClientRequestDto } from './dto/request/update-client-request.dto';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { ClientScoped } from 'src/shared/decorators/client-scoped.decorator';

@Controller('clients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesPermissionsGuard)
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
  @Roles(UserRole.ADMIN)
  async createClient(@Body() data: CreateUserRequestDto) {
      return this.clientService.createClient(data);
  }

  @ApiOperation({ summary: "Retrieve all clients" })
  @ApiResponse({
      status: 200,
      description: 'List of clients retrieved successfully',
  })
  @Get()
  @Roles(UserRole.ADMIN, UserRole.COACH)
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
  @Get(':clientId')
  @Roles(UserRole.ADMIN, UserRole.CLIENT_ADMIN, UserRole.PARTICIPANT, UserRole.COACH)
  @ClientScoped()
  async getClientById(@Param('clientId') id: number) {
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
  @Put(':clientId')
  @Roles(UserRole.ADMIN, UserRole.CLIENT_ADMIN)
  @ClientScoped()
  async updateClient(@Param('clientId') id: number, @Body() data: UpdateClientRequestDto) {
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
  @Delete(':clientId')
  @Roles(UserRole.ADMIN)
  async deleteClient(@Param('clientId') id: number) {
      return this.clientService.deleteClient(Number(id));
  }
}
