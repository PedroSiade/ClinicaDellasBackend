/*
  Warnings:

  - You are about to drop the column `duration` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `service` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "service_slug_key";

-- AlterTable
ALTER TABLE "service" DROP COLUMN "duration",
DROP COLUMN "slug";
