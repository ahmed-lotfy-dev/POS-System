/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `units` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `units` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "units" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "units_name_key" ON "units"("name");
