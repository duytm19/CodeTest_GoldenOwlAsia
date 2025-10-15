/*
  Warnings:

  - You are about to drop the column `dateOfBirth` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Candidate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "dateOfBirth",
DROP COLUMN "fullName";
