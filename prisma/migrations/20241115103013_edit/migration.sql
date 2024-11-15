/*
  Warnings:

  - You are about to drop the column `bio` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "bio",
ADD COLUMN     "description" TEXT;
