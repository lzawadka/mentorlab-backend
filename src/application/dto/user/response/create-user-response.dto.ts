import { ApiProperty } from '@nestjs/swagger';
import { UserBaseDto } from '../user-base.dto';

export class CreateUserResponseDto extends UserBaseDto {
  @ApiProperty({ description: "User id" })
  id: number;

  @ApiProperty({ description: "User creation date" })
  createdAt: Date;
}
