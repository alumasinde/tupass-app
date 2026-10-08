CREATE DATABASE IF NOT EXISTS tupass_local
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'alumasinde'@'localhost' IDENTIFIED BY '21082108';
GRANT ALL PRIVILEGES ON tupass_local.* TO 'alumasinde'@'localhost';
FLUSH PRIVILEGES;
