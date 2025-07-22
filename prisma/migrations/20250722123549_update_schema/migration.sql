/*
  Warnings:

  - The values [DENTIST,NURSE,OTHER] on the enum `role` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `_CategoryToService` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `category` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `excerpt` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `metaDescription` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `metaTitle` on the `post` table. All the data in the column will be lost.
  - The `id` column on the `post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `professional` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `slug` on the `professional` table. All the data in the column will be lost.
  - The `id` column on the `professional` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `name` on the `professional` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.
  - The primary key for the `service` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `price` on the `service` table. All the data in the column will be lost.
  - The `id` column on the `service` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `specialty` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `specialty` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `_PostToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `professional_specialty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `service_professional` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tag` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `A` on the `_CategoryToService` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_CategoryToService` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `description` to the `post` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `professionalId` on the `post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "role_new" AS ENUM ('DOCTOR', 'NUTRITIONIST', 'PSYCHOLOGIST', 'PHYSIOTHERAPIST', 'OWNER');
ALTER TABLE "professional" ALTER COLUMN "role" TYPE "role_new" USING ("role"::text::"role_new");
ALTER TYPE "role" RENAME TO "role_old";
ALTER TYPE "role_new" RENAME TO "role";
DROP TYPE "role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "_CategoryToService" DROP CONSTRAINT "_CategoryToService_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToService" DROP CONSTRAINT "_CategoryToService_B_fkey";

-- DropForeignKey
ALTER TABLE "_PostToTag" DROP CONSTRAINT "_PostToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostToTag" DROP CONSTRAINT "_PostToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_professionalId_fkey";

-- DropForeignKey
ALTER TABLE "professional_specialty" DROP CONSTRAINT "professional_specialty_professionalId_fkey";

-- DropForeignKey
ALTER TABLE "professional_specialty" DROP CONSTRAINT "professional_specialty_specialtyId_fkey";

-- DropForeignKey
ALTER TABLE "service_professional" DROP CONSTRAINT "service_professional_professionalId_fkey";

-- DropForeignKey
ALTER TABLE "service_professional" DROP CONSTRAINT "service_professional_serviceId_fkey";

-- DropIndex
DROP INDEX "professional_slug_key";

-- AlterTable
ALTER TABLE "_CategoryToService" DROP CONSTRAINT "_CategoryToService_AB_pkey",
DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL,
DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL,
ADD CONSTRAINT "_CategoryToService_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "category" DROP CONSTRAINT "category_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "category_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "post" DROP CONSTRAINT "post_pkey",
DROP COLUMN "excerpt",
DROP COLUMN "metaDescription",
DROP COLUMN "metaTitle",
ADD COLUMN     "description" VARCHAR(250) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "professionalId",
ADD COLUMN     "professionalId" INTEGER NOT NULL,
ADD CONSTRAINT "post_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "professional" DROP CONSTRAINT "professional_pkey",
DROP COLUMN "slug",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(50),
ADD CONSTRAINT "professional_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "service" DROP CONSTRAINT "service_pkey",
DROP COLUMN "price",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "service_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "specialty" DROP CONSTRAINT "specialty_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "specialty_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "_PostToTag";

-- DropTable
DROP TABLE "professional_specialty";

-- DropTable
DROP TABLE "service_professional";

-- DropTable
DROP TABLE "tag";

-- CreateIndex
CREATE INDEX "_CategoryToService_B_index" ON "_CategoryToService"("B");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "professional"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToService" ADD CONSTRAINT "_CategoryToService_A_fkey" FOREIGN KEY ("A") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToService" ADD CONSTRAINT "_CategoryToService_B_fkey" FOREIGN KEY ("B") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
