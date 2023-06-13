-- CreateTable
CREATE TABLE `data` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filename` VARCHAR(100) NOT NULL,
    `Path` VARCHAR(100) NOT NULL,
    `createdon` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
