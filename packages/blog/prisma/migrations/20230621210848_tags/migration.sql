/*
  Warnings:

  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Post` table. All the data in the column will be lost.
  - Added the required column `keywords` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescription` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Made the column `published` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Post` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `keywords` TEXT NOT NULL,
    ADD COLUMN `shortDescription` TEXT NOT NULL,
    ADD COLUMN `tags` VARCHAR(191) NULL,
    MODIFY `publishedAt` DATETIME(3) NULL,
    MODIFY `published` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `Tag` (
    `slug` VARCHAR(191) NOT NULL,
    `name` VARCHAR(256) NOT NULL,
    `hex` VARCHAR(6) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Tag_slug_key`(`slug`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
