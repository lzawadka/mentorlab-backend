import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/prisma/prisma.service';
import { UserRepository } from './infrastructure/repository/user.repository';
import { UserController } from './application/controllers/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './domain/services/auth.service';
import { UserUseCase } from './application/use-cases/user.usecase';
import { ClientService } from './domain/services/client.service';
import { CampaignService } from './domain/services/campaign.service';
import { ParticipantService } from './domain/services/participant.service';
import { TeamService } from './domain/services/team.service';
import { CampaignController } from './application/controllers/campaign.controller';
import { TeamController } from './application/controllers/team.controller';
import { AuthController } from './application/controllers/auth.controller';
import { ClientController } from './application/controllers/client.controller';
import { ParticipantController } from './application/controllers/participant.controller';
import { ParticipantRepository } from './infrastructure/repository/participant.repository';
import { ClientRepository } from './infrastructure/repository/client.repository';
import { TeamRepository } from './infrastructure/repository/team.repository';
import { CampaignRepository } from './infrastructure/repository/campaign.repository';
import { UserService } from './domain/services/user.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: "1h" },
    }),
  ],
  controllers: [UserController, CampaignController, TeamController, AuthController, ClientController, ParticipantController],
  providers: [
    UserUseCase,
    
    PrismaService, 
    AuthService,
    UserService,
    ClientService,
    CampaignService,
    ParticipantService,
    TeamService,
    {
      provide: UserRepository,
      useClass: UserRepository,
    },
    {
      provide: ParticipantRepository,
      useClass: ParticipantRepository,
    },
    {
      provide: ClientRepository,
      useClass: ClientRepository,
    },
    {
      provide: TeamRepository,
      useClass: TeamRepository,
    },
    {
      provide: CampaignRepository,
      useClass: CampaignRepository,
    }
  ]
})
export class AppModule {}
