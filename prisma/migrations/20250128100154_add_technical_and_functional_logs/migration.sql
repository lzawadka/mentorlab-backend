-- CreateTable
CREATE TABLE "LogTechnical" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "action" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "LogTechnical_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogFunctional" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "action" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "LogFunctional_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LogTechnical_timestamp_idx" ON "LogTechnical"("timestamp");

-- CreateIndex
CREATE INDEX "LogFunctional_timestamp_idx" ON "LogFunctional"("timestamp");
