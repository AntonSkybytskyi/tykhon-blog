/*
  Warnings:

  - You are about to drop the column `enabled` on the `Tag` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Tag` ADD COLUMN `enabled` BOOLEAN NOT NULL DEFAULT true;

