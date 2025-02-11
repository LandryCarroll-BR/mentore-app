/*
  Warnings:

  - Added the required column `formType` to the `FormField` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FormField" ADD COLUMN     "formType" "FieldType" NOT NULL;
