import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { UserBaseDto } from '../user-base.dto';

export class CreateUserDto extends UserBaseDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
