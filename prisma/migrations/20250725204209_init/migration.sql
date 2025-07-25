/*
  Warnings:

  - You are about to drop the `_CategoryToService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToService" DROP CONSTRAINT "_CategoryToService_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToService" DROP CONSTRAINT "_CategoryToService_B_fkey";

-- DropTable
DROP TABLE "_CategoryToService";

-- DropTable
DROP TABLE "category";
