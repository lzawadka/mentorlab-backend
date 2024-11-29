import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class LoginUserRequestDto {
    @ApiProperty({ description: "L'email de l'utilisateur", example: 'example@mail.com' })
    @IsString()
    @IsNotEmpty()
    email: string;
  
    @ApiProperty({ description: "Le mot de passe de l'utilisateur", example: 'StrongPassword123' })
    @IsString()
    @IsNotEmpty()
    password: string;
}