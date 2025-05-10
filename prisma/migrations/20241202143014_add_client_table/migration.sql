-- AlterTable
ALTER TABLE "Campaign" ALTER COLUMN "type" SET DEFAULT 'team';

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "points" DROP DEFAULT;
