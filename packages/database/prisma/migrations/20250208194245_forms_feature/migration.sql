/*
  Warnings:

  - You are about to drop the column `availability` on the `Mentor` table. All the data in the column will be lost.
  - You are about to drop the column `feedback` on the `ReferenceForm` table. All the data in the column will be lost.
  - You are about to drop the column `relationship` on the `ReferenceForm` table. All the data in the column will be lost.
  - Added the required column `formId` to the `MentorApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formId` to the `ReferenceForm` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FieldType" AS ENUM ('TEXT', 'TEXTAREA', 'SELECT', 'RADIO', 'CHECKBOX', 'DATE', 'NUMBER', 'FILE');

-- AlterTable
ALTER TABLE "Mentor" DROP COLUMN "availability";

-- AlterTable
ALTER TABLE "MentorApplication" ADD COLUMN     "formId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ReferenceForm" DROP COLUMN "feedback",
DROP COLUMN "relationship",
ADD COLUMN     "formId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Form" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationForm" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "formId" TEXT NOT NULL,

    CONSTRAINT "OrganizationForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormStep" (
    "id" TEXT NOT NULL,
    "stepOrder" INTEGER NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "formId" TEXT NOT NULL,

    CONSTRAINT "FormStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormField" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "label" TEXT NOT NULL,
    "fieldType" "FieldType" NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT false,
    "formStepId" TEXT NOT NULL,

    CONSTRAINT "FormField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormFieldOption" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "fieldId" TEXT NOT NULL,

    CONSTRAINT "FormFieldOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormSubmission" (
    "id" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "formId" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "FormSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormResponse" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "fieldId" TEXT NOT NULL,

    CONSTRAINT "FormResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OrganizationForm_organizationId_idx" ON "OrganizationForm"("organizationId");

-- CreateIndex
CREATE INDEX "OrganizationForm_formId_idx" ON "OrganizationForm"("formId");

-- CreateIndex
CREATE INDEX "FormStep_formId_idx" ON "FormStep"("formId");

-- CreateIndex
CREATE INDEX "FormField_formStepId_idx" ON "FormField"("formStepId");

-- CreateIndex
CREATE INDEX "FormFieldOption_fieldId_idx" ON "FormFieldOption"("fieldId");

-- CreateIndex
CREATE INDEX "FormSubmission_userId_idx" ON "FormSubmission"("userId");

-- CreateIndex
CREATE INDEX "FormSubmission_formId_idx" ON "FormSubmission"("formId");

-- CreateIndex
CREATE INDEX "FormResponse_submissionId_idx" ON "FormResponse"("submissionId");

-- CreateIndex
CREATE INDEX "FormResponse_fieldId_idx" ON "FormResponse"("fieldId");

-- CreateIndex
CREATE INDEX "MentorApplication_formId_idx" ON "MentorApplication"("formId");

-- CreateIndex
CREATE INDEX "ReferenceForm_formId_idx" ON "ReferenceForm"("formId");
