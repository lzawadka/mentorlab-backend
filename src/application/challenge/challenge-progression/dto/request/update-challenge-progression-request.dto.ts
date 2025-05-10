import { IsString, IsEnum, IsOptional, IsDate } from 'class-validator';

export class UpdateChallengeProgressionDto {
  @IsOptional()
  @IsString()
  participantId?: string;

  @IsOptional()
  @IsString()
  challengeId?: string;

  @IsOptional()
  @IsEnum(['IN_PROGRESS', 'COMPLETED'])
  status?: string;

  @IsOptional()
  @IsDate()
  completedAt?: Date;

  order?: number;
}
