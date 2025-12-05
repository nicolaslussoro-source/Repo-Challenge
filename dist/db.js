"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = init;
const mariadb_1 = __importDefault(require("mariadb"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = mariadb_1.default.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'nico1234',
    database: process.env.DB_NAME || 'challenge',
    connectionLimit: 10
});
async function init() {
    // Create users table if not exists
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
