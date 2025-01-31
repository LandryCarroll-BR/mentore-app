/*
  Warnings:

  - The primary key for the `OrganizationUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `organizationUserid` on the `OrganizationUser` table. All the data in the column will be lost.
  - The required column `organizationUserId` was added to the `OrganizationUser` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "OrganizationUser" DROP CONSTRAINT "OrganizationUser_pkey",
DROP COLUMN "organizationUserid",
ADD COLUMN     "organizationUserId" TEXT NOT NULL,
ADD CONSTRAINT "OrganizationUser_pkey" PRIMARY KEY ("organizationUserId");
