import { ApiProperty } from "@nestjs/swagger";

export class UserBaseDto {
    @ApiProperty({ description: "User mail" })
    email: string;
  
    @ApiProperty({ description: "User firstname" })
    firstName?: string;
  
    @ApiProperty({ description: "User lastName" })
    lastName?: string;
  
    @ApiProperty({ description: "User role (participant, coach, admin)" })
    role: string;
}