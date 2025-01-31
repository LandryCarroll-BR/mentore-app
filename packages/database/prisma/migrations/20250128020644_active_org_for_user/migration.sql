-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activeOrganizationId" TEXT;

-- CreateIndex
CREATE INDEX "User_activeOrganizationId_idx" ON "User"("activeOrganizationId");
