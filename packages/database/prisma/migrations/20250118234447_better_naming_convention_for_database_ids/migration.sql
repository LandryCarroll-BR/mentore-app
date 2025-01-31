/*
  Warnings:

  - The primary key for the `MentorPartner` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `MentorPartner` table. All the data in the column will be lost.
  - The primary key for the `OrganizationUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `OrganizationUser` table. All the data in the column will be lost.
  - The required column `mentorPartnerId` was added to the `MentorPartner` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `organizationUserid` was added to the `OrganizationUser` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "MentorPartner" DROP CONSTRAINT "MentorPartner_pkey",
DROP COLUMN "id",
ADD COLUMN     "mentorPartnerId" TEXT NOT NULL,
ADD CONSTRAINT "MentorPartner_pkey" PRIMARY KEY ("mentorPartnerId");

-- AlterTable
ALTER TABLE "OrganizationUser" DROP CONSTRAINT "OrganizationUser_pkey",
DROP COLUMN "id",
ADD COLUMN     "organizationUserid" TEXT NOT NULL,
ADD CONSTRAINT "OrganizationUser_pkey" PRIMARY KEY ("organizationUserid");
