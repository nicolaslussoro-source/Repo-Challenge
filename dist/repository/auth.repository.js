"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoginUser = getLoginUser;
exports.actualizarLoginInfo = actualizarLoginInfo;
exports.getUserByEmail = getUserByEmail;
exports.insertUser = insertUser;
exports.getUserById = getUserById;
const db_1 = __importDefault(require("../db"));
async function getLoginUser(email) {
    const rows = await db_1.default.query('SELECT id, name, email, password_hash, created_at, last_login, login_count FROM users WHERE email = ?', [email]);
    const results = Array.isArray(rows) ? rows : [];
    const user = results[0];
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        password_hash: user.password_hash,
        created_at: user.created_at,
        last_login: user.last_login,
        login_count: user.login_count
    };
}
async function actualizarLoginInfo(id) {
    await db_1.default.query('UPDATE users SET last_login = NOW(), login_count = login_count + 1 WHERE id = ?', [id]);
}
async function getUserByEmail(email) {
    const rows = await db_1.default.query('SELECT id, name, email, password_hash, created_at, last_login, login_count FROM users WHERE email = ?', [email]);
    const results = Array.isArray(rows) ? rows : [];
    const user = results[0];
    if (!user)
        return null;
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        password_hash: user.password_hash,
        created_at: user.created_at,
        last_login: user.last_login,
        login_count: user.login_count
    };
}
async function insertUser(id, name, email, password_hash) {
    await db_1.default.query('INSERT INTO users (id, name, email, password_hash) VALUES (?, ?, ?, ?)', [id, name, email, password_hash]);
}
async function getUserById(id) {
    const rows = await db_1.default.query('SELECT id, name, email, password_hash, created_at, last_login, login_count FROM users WHERE id = ?', [id]);
    const results = Array.isArray(rows) ? rows : [];
    const user = results[0];
    if (!user)
        return null;
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        password_hash: user.password_hash,
        created_at: user.created_at,
        last_login: user.last_login,
        login_count: user.login_count
    };
}
