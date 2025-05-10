/*
  Warnings:

  - You are about to drop the `LogFunctional` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LogTechnical` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "LogFunctional";

-- DropTable
DROP TABLE "LogTechnical";

-- CreateTable
CREATE TABLE "log_technical" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "action" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "log_technical_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "log_functional" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "action" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "log_functional_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "log_technical_timestamp_idx" ON "log_technical"("timestamp");

-- CreateIndex
CREATE INDEX "log_functional_timestamp_idx" ON "log_functional"("timestamp");
