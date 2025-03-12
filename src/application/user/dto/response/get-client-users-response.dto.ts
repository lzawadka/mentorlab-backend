import { ApiProperty } from '@nestjs/swagger';
import { GetUserResponseDto } from './get-user-response.dto';

export class GetClientWithUsersResponseDto {
  @ApiProperty({description: "The client's unique identifier"})
  clientId: number;

  @ApiProperty({description: "The client's name"})
  name: string;

  @ApiProperty({description: "A description of the client"})
  description?: string;

  @ApiProperty({description: "The contact email for the client"})
  contactEmail: string;

  @ApiProperty({description: "The date the client was created"})
  createdAt: Date;

  @ApiProperty({description: "The date the client was last updated"})
  updatedAt: Date;

  @ApiProperty({
    description: "The list of users associated with the client",
    type: [GetUserResponseDto],
  })
  users: GetUserResponseDto[];
}
