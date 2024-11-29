import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/prisma/prisma.service';
import { UserRepository } from './infrastructure/repository/user.repository';
import { UserController } from './application/controllers/user.controller';
import { AuthenticateUserUseCase } from './application/use-cases/authenticate-user-usecase';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './domain/services/auth.service';
import { UserUseCase } from './application/use-cases/user.usecase';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: "1h" },
    }),
  ],
  controllers: [UserController],
  providers: [
    UserUseCase, 
    AuthenticateUserUseCase,
    
    PrismaService, 
    AuthService,
    {
    provide: UserRepository,
    useClass: UserRepository,
    }
  ]
})
export class AppModule {}
