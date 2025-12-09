"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = getUserByEmail;
exports.getAllUsers = getAllUsers;
const db_1 = __importDefault(require("../db"));
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
async function getAllUsers() {
    const rows = await db_1.default.query('SELECT id, name, email, password_hash, created_at, last_login, login_count FROM users');
    const results = Array.isArray(rows) ? rows : [];
    return results.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name,
        password_hash: user.password_hash,
        created_at: user.created_at,
        last_login: user.last_login,
        login_count: user.login_count
    }));
}
