import {  IsEnum, IsOptional, IsDate, IsNumber } from 'class-validator';

export class ChallengeProgressionBaseDto {
    @IsNumber()
    id: number;

    @IsNumber()
    participantId: number;

    @IsNumber()
    challengeId: number;

    @IsEnum(['IN_PROGRESS', 'COMPLETED'])
    status: string;

    @IsOptional()
    @IsDate()
    completedAt: Date | null;
}
