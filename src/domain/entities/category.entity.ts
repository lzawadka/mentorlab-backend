import { ChallengeCategory } from "./relations/challenge-category.entity";

export class Category {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  
    challenges?: ChallengeCategory[]; // Challenges associés à cette catégorie
  }
  