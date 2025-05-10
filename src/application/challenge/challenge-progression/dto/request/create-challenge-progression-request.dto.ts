import { IsEnum, IsOptional, IsDate, IsNumber } from 'class-validator';

export class CreateChallengeProgressionDto {
  @IsNumber()
  @IsOptional()
  participantId: number;

  @IsNumber()
  challengeId: number;

  @IsNumber()
  campaignId: number;

  @IsEnum(['IN_PROGRESS', 'COMPLETED'])
  status: string;

  @IsOptional()
  @IsDate()
  completedAt?: Date;
}
