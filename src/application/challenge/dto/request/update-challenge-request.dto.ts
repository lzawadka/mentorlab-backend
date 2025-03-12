import { PartialType } from '@nestjs/swagger';
import { CreateChallengeRequestDto } from './create-challenge-request.dto';

export class UpdateChallengeDto extends PartialType(CreateChallengeRequestDto) {}
