CREATE TABLE `identification_types` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `code` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NULL,
  `is_active` BOOLEAN NOT NULL DEFAULT true,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `identification_types_code_key` (`code`),
  INDEX `identification_types_is_active_idx` (`is_active`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `organizations` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `slug` VARCHAR(100) NOT NULL,
  `code` VARCHAR(50) NOT NULL,
  `is_active` BOOLEAN NOT NULL DEFAULT true,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `organizations_slug_key` (`slug`),
  UNIQUE INDEX `organizations_code_key` (`code`),
  INDEX `organizations_is_active_idx` (`is_active`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `users` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(191) NULL,
  `phone` VARCHAR(30) NULL,
  `is_active` BOOLEAN NOT NULL DEFAULT true,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `users_email_key` (`email`),
  UNIQUE INDEX `users_phone_key` (`phone`),
  INDEX `users_is_active_idx` (`is_active`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO `identification_types` (`name`, `code`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
  ('National ID', 'NATIONAL_ID', 'National identity document', true, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('Passport', 'PASSPORT', 'Passport document', true, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('Driving Licence', 'DRIVING_LICENCE', 'Driving licence document', true, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('Alien ID', 'ALIEN_ID', 'Foreign national identification document', true, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('Staff ID', 'STAFF_ID', 'Organization-issued staff identification', true, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));
