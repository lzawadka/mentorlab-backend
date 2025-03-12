import { ApiProperty } from '@nestjs/swagger';
import { UserBaseDto } from 'src/application/user/dto/user-base.dto';

export class LoginResponseDto extends UserBaseDto {
  @ApiProperty({ description: "L'ID de l'utilisateur" })
  userId: number;

  @ApiProperty({ description: 'Token JWT pour accéder aux ressources protégées' })
  accessToken: string;

  @ApiProperty({ description: 'Refresh token pour renouveler le token JWT' })
  refreshToken: string;

  @ApiProperty({ description: 'User clientId' })
  clientId: number;
}
