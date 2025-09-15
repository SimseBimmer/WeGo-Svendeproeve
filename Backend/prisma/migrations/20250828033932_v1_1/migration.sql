/*
  Warnings:

  - You are about to drop the column `image` on the `slides` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `users` table. All the data in the column will be lost.
  - Added the required column `iconUrl` to the `bagsizes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `slides` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bagsizes` ADD COLUMN `iconUrl` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `slides` DROP COLUMN `image`,
    ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `image`,
    ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL;
