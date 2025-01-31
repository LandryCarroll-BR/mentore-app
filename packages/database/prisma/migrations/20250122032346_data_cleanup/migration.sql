/*
  Warnings:

  - The values [DENIED,INCOMPLETE] on the enum `ApplicationStatus` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Mentor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MentorApplication` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `applicationId` on the `MentorApplication` table. All the data in the column will be lost.
  - You are about to drop the column `referenceEmail` on the `MentorApplication` table. All the data in the column will be lost.
  - You are about to drop the column `writtenResponse` on the `MentorApplication` table. All the data in the column will be lost.
  - The primary key for the `Organization` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `organizationId` on the `Organization` table. All the data in the column will be lost.
  - The primary key for the `OrganizationUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `organizationUserId` on the `OrganizationUser` table. All the data in the column will be lost.
  - The primary key for the `Partner` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `partnerStatus` on the `Partner` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `MentorPartner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MentorReference` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[organizationUserId]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[organizationUserId]` on the table `Mentor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[organizationUserId]` on the table `Partner` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Admin` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updatedAt` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `availability` to the `Mentor` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Mentor` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updatedAt` to the `Mentor` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `MentorApplication` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Organization` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `OrganizationUser` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updatedAt` to the `OrganizationUser` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `role` on the `OrganizationUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - The required column `id` was added to the `Partner` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updatedAt` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MENTOR', 'PARTNER');

-- AlterEnum
BEGIN;
CREATE TYPE "ApplicationStatus_new" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
ALTER TABLE "MentorApplication" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "MentorApplication" ALTER COLUMN "status" TYPE "ApplicationStatus_new" USING ("status"::text::"ApplicationStatus_new");
ALTER TYPE "ApplicationStatus" RENAME TO "ApplicationStatus_old";
ALTER TYPE "ApplicationStatus_new" RENAME TO "ApplicationStatus";
DROP TYPE "ApplicationStatus_old";
ALTER TABLE "MentorApplication" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Mentor" DROP CONSTRAINT "Mentor_pkey",
ADD COLUMN     "availability" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Mentor_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "MentorApplication" DROP CONSTRAINT "MentorApplication_pkey",
DROP COLUMN "applicationId",
DROP COLUMN "referenceEmail",
DROP COLUMN "writtenResponse",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "MentorApplication_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_pkey",
DROP COLUMN "organizationId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Organization_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "OrganizationUser" DROP CONSTRAINT "OrganizationUser_pkey",
DROP COLUMN "organizationUserId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL,
ADD CONSTRAINT "OrganizationUser_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Partner" DROP CONSTRAINT "Partner_pkey",
DROP COLUMN "partnerStatus",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "releaseDate" TIMESTAMP(3),
ADD COLUMN     "status" "PartnerStatus" NOT NULL DEFAULT 'RESIDENT',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Partner_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "userId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "MentorPartner";

-- DropTable
DROP TABLE "MentorReference";

-- DropEnum
DROP TYPE "OrganizationRole";

-- CreateTable
CREATE TABLE "ReferenceForm" (
    "id" TEXT NOT NULL,
    "mentorApplicationId" TEXT,
    "referenceName" TEXT NOT NULL,
    "referenceEmail" TEXT NOT NULL,
    "relationship" TEXT,
    "feedback" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReferenceForm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ReferenceForm_mentorApplicationId_idx" ON "ReferenceForm"("mentorApplicationId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_organizationUserId_key" ON "Admin"("organizationUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Mentor_organizationUserId_key" ON "Mentor"("organizationUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Partner_organizationUserId_key" ON "Partner"("organizationUserId");
