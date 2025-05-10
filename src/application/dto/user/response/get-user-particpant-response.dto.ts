import { ApiProperty } from "@nestjs/swagger";
import { GetParticipantResponseDto } from "../../participant/response/get-particpant-response.dto";
import { UserBaseDto } from "../user-base.dto";

export class GetUserParticipantResponseDto extends UserBaseDto {
    @ApiProperty({ description: "User Id" })
    id: number;

    @ApiProperty({ description: "User creation date" })
    createdAt: Date;

    @ApiProperty({ description: "User update date" })
    updatedAt: Date;

    @ApiProperty({
        description: "The list of particpants associated with the client",
        type: [GetParticipantResponseDto],
    })
    particpants?: GetParticipantResponseDto[];
}