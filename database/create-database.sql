CREATE DATABASE IF NOT EXISTS gatepass
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'gatepass'@'localhost' IDENTIFIED BY 'change-me';
GRANT ALL PRIVILEGES ON gatepass.* TO 'gatepass'@'localhost';
FLUSH PRIVILEGES;
