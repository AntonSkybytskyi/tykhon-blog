/*
  Warnings:

  - You are about to drop the column `tags` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Post` DROP COLUMN `tags`;

-- AlterTable
ALTER TABLE `Tag` ADD COLUMN `enabled` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX `Post_slug_idx` ON `Post`(`slug`);

-- CreateIndex
CREATE INDEX `Tag_slug_idx` ON `Tag`(`slug`);
