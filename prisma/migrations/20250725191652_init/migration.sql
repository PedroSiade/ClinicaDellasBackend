/*
  Warnings:

  - You are about to drop the column `isPublished` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `publishedAt` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `professional` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "post_slug_key";

-- AlterTable
ALTER TABLE "post" DROP COLUMN "isPublished",
DROP COLUMN "publishedAt",
DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "professional" DROP COLUMN "isActive";
