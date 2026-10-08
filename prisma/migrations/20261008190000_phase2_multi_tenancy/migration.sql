CREATE TABLE `organization_domains` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `organization_id` BIGINT UNSIGNED NOT NULL,
  `hostname` VARCHAR(255) NOT NULL,
  `is_primary` BOOLEAN NOT NULL DEFAULT false,
  `is_active` BOOLEAN NOT NULL DEFAULT true,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `organization_domains_hostname_key` (`hostname`),
  INDEX `organization_domains_organization_id_is_active_idx` (`organization_id`, `is_active`),
  CONSTRAINT `organization_domains_organization_id_fkey`
    FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
