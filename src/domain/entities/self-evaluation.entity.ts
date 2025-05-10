import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SelfEvaluation {
    id: number;
    participantId: number;
    categoryId: number;
    score: number;
    createdAt: Date;
}