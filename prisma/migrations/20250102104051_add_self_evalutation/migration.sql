/*
  Warnings:

  - The primary key for the `SelfEvaluation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `SelfEvaluation` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "SelfEvaluation" DROP CONSTRAINT "SelfEvaluation_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "SelfEvaluation_pkey" PRIMARY KEY ("id");
