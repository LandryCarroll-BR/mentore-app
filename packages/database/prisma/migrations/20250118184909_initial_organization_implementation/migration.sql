/*
  Warnings:

  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Admin` table. All the data in the column will be lost.
  - The primary key for the `Mentor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Mentor` table. All the data in the column will be lost.
  - The primary key for the `Partner` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the `Page` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `organizationUserId` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationUserId` to the `Mentor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationUserId` to the `Partner` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrganizationRole" AS ENUM ('ADMIN', 'MENTOR', 'PARTNER');

-- DropIndex
DROP INDEX "user_unique_index";

-- AlterTable
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_pkey",
DROP COLUMN "userId",
ADD COLUMN     "organizationUserId" TEXT NOT NULL,
ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("organizationUserId");

-- AlterTable
ALTER TABLE "Mentor" DROP CONSTRAINT "Mentor_pkey",
DROP COLUMN "userId",
ADD COLUMN     "organizationUserId" TEXT NOT NULL,
ADD CONSTRAINT "Mentor_pkey" PRIMARY KEY ("organizationUserId");

-- AlterTable
ALTER TABLE "Partner" DROP CONSTRAINT "Partner_pkey",
DROP COLUMN "userId",
ADD COLUMN     "organizationUserId" TEXT NOT NULL,
ADD CONSTRAINT "Partner_pkey" PRIMARY KEY ("organizationUserId");

-- DropTable
DROP TABLE "Page";

-- CreateTable
CREATE TABLE "Organization" (
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("organizationId")
);

-- CreateTable
CREATE TABLE "OrganizationUser" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "OrganizationRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrganizationUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OrganizationUser_userId_idx" ON "OrganizationUser"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationUser_organizationId_userId_key" ON "OrganizationUser"("organizationId", "userId");
