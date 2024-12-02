import { ApiProperty } from '@nestjs/swagger';
import { UserBaseDto } from '../user-base.dto';

export class UpdateUserResponseDto extends UserBaseDto {
  @ApiProperty({ description: "User id" })
  id: number;

  @ApiProperty({ description: "User update date" })
  updatedAt?: Date;
}
