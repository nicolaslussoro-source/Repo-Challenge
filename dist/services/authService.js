"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.register = register;
exports.getById = getById;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../db"));
const crypto_1 = require("crypto");
async function login(email, password) {
    const rows = await db_1.default.query('SELECT id, password_hash FROM users WHERE email = ?', [email]);
    const results = Array.isArray(rows) ? rows : [];
    const user = results[0];
    if (!user)
        return null;
    const match = await bcryptjs_1.default.compare(password, user.password_hash);
    if (!match)
        return null;
    await db_1.default.query('UPDATE users SET last_login = NOW(), login_count = login_count + 1 WHERE id = ?', [user.id]);
    const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
    const token = jsonwebtoken_1.default.sign({ sub: user.id, email }, JWT_SECRET, { expiresIn: '1h' });
    return token;
}
async function register(name, email, password) {
    const foundRows = await db_1.default.query('SELECT id FROM users WHERE email = ?', [email]);
    const found = Array.isArray(foundRows) ? foundRows : [];
    if (found.length)
        throw new Error('email already in use');
    const id = (0, crypto_1.randomUUID)();
    const passwordHash = await bcryptjs_1.default.hash(password, 8);
    await db_1.default.query('INSERT INTO users (id, name, email, password_hash) VALUES (?, ?, ?, ?)', [id, name || '', email, passwordHash]);
    return { id, email, name: name || '' };
}
async function getById(id) {
    const rows = await db_1.default.query('SELECT id, email, name, created_at, last_login, login_count FROM users WHERE id = ?', [id]);
    const results = Array.isArray(rows) ? rows : [];
    const u = results[0];
    if (!u)
        return null;
    return {
        id: u.id,
        email: u.email,
        name: u.name,
        created_at: u.created_at ? new Date(u.created_at).toISOString() : null,
        last_login: u.last_login ? new Date(u.last_login).toISOString() : null,
        login_count: u.login_count || 0
    };
}
