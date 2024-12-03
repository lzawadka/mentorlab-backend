import { ApiProperty } from "@nestjs/swagger";

export class CreateRefreshTokenRequestDto {
    @ApiProperty()
    userId: number; 
    @ApiProperty()
    refreshToken: string;
}