/*
  Warnings:

  - You are about to drop the column `role` on the `OrganizationUser` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,roleId,organizationId]` on the table `OrganizationUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roleId` to the `OrganizationUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "OrganizationUser_organizationId_userId_key";

-- DropIndex
DROP INDEX "OrganizationUser_userId_idx";

-- AlterTable
ALTER TABLE "OrganizationUser" DROP COLUMN "role",
ADD COLUMN     "roleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isSuperUser" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isGlobal" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_action_key" ON "Permission"("action");

-- CreateIndex
CREATE INDEX "RolePermission_permissionId_idx" ON "RolePermission"("permissionId");

-- CreateIndex
CREATE UNIQUE INDEX "RolePermission_roleId_permissionId_key" ON "RolePermission"("roleId", "permissionId");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_name_key" ON "Organization"("name");

-- CreateIndex
CREATE INDEX "OrganizationUser_organizationId_idx" ON "OrganizationUser"("organizationId");

-- CreateIndex
CREATE INDEX "OrganizationUser_roleId_idx" ON "OrganizationUser"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationUser_userId_roleId_organizationId_key" ON "OrganizationUser"("userId", "roleId", "organizationId");
