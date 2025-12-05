"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = getUser;
exports.getAllUsers = getAllUsers;
const db_1 = __importDefault(require("../db"));
async function getUser(email) {
    const rows = await db_1.default.query('SELECT id, name, email, created_at, last_login, login_count FROM users WHERE email = ?', [email]);
    const results = Array.isArray(rows) ? rows : [];
    const user = results[0];
    if (!user)
        return null;
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at ? new Date(user.created_at).toISOString() : null,
        last_login: user.last_login ? new Date(user.last_login).toISOString() : null,
        login_count: user.login_count || 0
    };
}
async function getAllUsers() {
    const rows = await db_1.default.query('SELECT id, name, email, created_at, last_login, login_count FROM users');
    const results = Array.isArray(rows) ? rows : [];
    return results.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at ? new Date(user.created_at).toISOString() : null,
        last_login: user.last_login ? new Date(user.last_login).toISOString() : null,
        login_count: user.login_count || 0
    }));
}
