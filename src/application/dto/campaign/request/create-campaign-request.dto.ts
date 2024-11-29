import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCampaignRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    clientId: number; 
    
    @ApiProperty()
    userIds: number[]; 
    
    @ApiProperty()
    @IsNotEmpty()
    title: string; 
    
    @ApiProperty()
    @IsNotEmpty()   
    description?: string; 
    
    @ApiProperty()
    startDate: Date; 
    
    @ApiProperty()
    endDate: Date
}