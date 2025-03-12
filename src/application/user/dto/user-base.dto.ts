import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class UserBaseDto {
    @Expose()
    @ApiProperty({ description: "User mail" })
    email: string;
  
    @Expose()
    @ApiProperty({ description: "User firstname" })
    firstName?: string;
  
    @Expose()
    @ApiProperty({ description: "User lastName" })
    lastName?: string;
  
    @Expose()
    @ApiProperty({ description: "User role (participant, coach, admin)" })
    role: string;
}