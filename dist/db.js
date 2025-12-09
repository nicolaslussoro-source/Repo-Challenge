"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = init;
const mariadb_1 = __importDefault(require("mariadb"));
const env_1 = require("./config/env");
const pool = mariadb_1.default.createPool({
    host: env_1.envs.DB_HOST,
    port: env_1.envs.DB_PORT,
    user: env_1.envs.DB_USER,
    password: env_1.envs.DB_PASSWORD,
    database: env_1.envs.DB_NAME,
    connectionLimit: 10
});
async function init() {
    const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) DEFAULT '',
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_login TIMESTAMP NULL,
      login_count INT DEFAULT 0
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
    await pool.query(createUsersTable);
}
exports.default = pool;
