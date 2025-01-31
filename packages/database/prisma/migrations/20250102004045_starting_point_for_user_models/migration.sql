-- CreateEnum
CREATE TYPE "PartnerStatus" AS ENUM ('RESIDENT', 'RELEASED');

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Admin" (
    "userId" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Mentor" (
    "userId" TEXT NOT NULL,

    CONSTRAINT "Mentor_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Partner" (
    "userId" TEXT NOT NULL,
    "partnerStatus" "PartnerStatus" NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "MentorPartner" (
    "id" TEXT NOT NULL,
    "mentorId" TEXT NOT NULL,
    "partnerId" TEXT NOT NULL,

    CONSTRAINT "MentorPartner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "user_unique_index" ON "User"("username", "email");

-- CreateIndex
CREATE UNIQUE INDEX "MentorPartner_partnerId_key" ON "MentorPartner"("partnerId");

-- CreateIndex
CREATE UNIQUE INDEX "MentorPartner_mentorId_partnerId_key" ON "MentorPartner"("mentorId", "partnerId");
