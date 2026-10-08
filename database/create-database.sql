CREATE DATABASE IF NOT EXISTS tupass
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- Replace the password before running. Do not commit real credentials.
CREATE USER IF NOT EXISTS 'tupass'@'localhost' IDENTIFIED BY 'change-me';
GRANT ALL PRIVILEGES ON tupass.* TO 'tupass'@'localhost';
FLUSH PRIVILEGES;
