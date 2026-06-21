/*
  Warnings:

  - You are about to drop the `client` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `client`;

-- CreateTable
CREATE TABLE `clients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `clientType` ENUM('Individual', 'Company', 'Developer', 'Government') NOT NULL,
    `clientCategory` ENUM('Residential', 'Commercial', 'Industrial', 'Institutional') NULL,
    `companyName` VARCHAR(191) NULL,
    `contactPersonName` VARCHAR(191) NULL,
    `designation` ENUM('Director', 'Owner', 'Manager') NULL,
    `countryCode` VARCHAR(191) NULL,
    `whatsappNumber` VARCHAR(191) NULL,
    `whatsappVerified` BOOLEAN NOT NULL DEFAULT false,
    `alternatePhone` VARCHAR(191) NULL,
    `website` VARCHAR(191) NULL,
    `gstNumber` VARCHAR(191) NULL,
    `panNumber` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
