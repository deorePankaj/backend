/*
  Warnings:

  - A unique constraint covering the columns `[mobileNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `mobileNumber` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_mobileNumber_key` ON `User`(`mobileNumber`);
