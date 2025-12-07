import mariadb from 'mariadb';
import { envs } from './config/env';


const pool = mariadb.createPool({
  host: envs.DB_HOST,
  port: envs.DB_PORT,
  user: envs.DB_USER,
  password: envs.DB_PASSWORD,
  database: envs.DB_NAME,
  connectionLimit: 10
});

export async function init() {
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

export default pool;
