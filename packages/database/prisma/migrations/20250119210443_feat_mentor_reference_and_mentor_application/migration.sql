-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'APPROVED', 'DENIED', 'INCOMPLETE');

-- CreateTable
CREATE TABLE "MentorApplication" (
    "applicationId" TEXT NOT NULL,
    "mentorId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "writtenResponse" TEXT NOT NULL,
    "referenceEmail" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MentorApplication_pkey" PRIMARY KEY ("applicationId")
);

-- CreateTable
CREATE TABLE "MentorReference" (
    "referenceId" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "response" TEXT,
    "submittedAt" TIMESTAMP(3),

    CONSTRAINT "MentorReference_pkey" PRIMARY KEY ("referenceId")
);

-- CreateIndex
CREATE INDEX "MentorApplication_organizationId_idx" ON "MentorApplication"("organizationId");

-- CreateIndex
CREATE INDEX "MentorApplication_mentorId_idx" ON "MentorApplication"("mentorId");

-- CreateIndex
CREATE UNIQUE INDEX "MentorReference_applicationId_key" ON "MentorReference"("applicationId");
