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
const crypto_1 = require("crypto");
const env_1 = require("../config/env");
const auth_repository_1 = require("../repository/auth.repository");
const metrics_service_1 = require("./metrics.service");
async function login(userRequest) {
    const user = await (0, auth_repository_1.getLoginUser)(userRequest.email);
    const match = await bcryptjs_1.default.compare(userRequest.password, user.password_hash);
    if (!match)
        return null;
    await (0, auth_repository_1.actualizarLoginInfo)(user.id);
    const JWT_SECRET = env_1.envs.JWT_SECRET || 'dev-secret-change-me';
    const token = jsonwebtoken_1.default.sign({ sub: user.id, email: userRequest.email }, JWT_SECRET, { expiresIn: '5h' }); // 5 horas para probar tranquilo luego dejar menor tiempo
    return token;
}
async function register(userRequest) {
    const found = await (0, metrics_service_1.getUser)(userRequest.email);
    if (found)
        throw new Error('email already in use');
    const id = (0, crypto_1.randomUUID)();
    const passwordHash = await bcryptjs_1.default.hash(userRequest.password, 8);
    await (0, auth_repository_1.insertUser)(id, userRequest.name, userRequest.email, passwordHash);
    return {
        id: id.toString(),
        email: userRequest.email,
        name: userRequest.name,
        created_at: new Date(),
        last_login: new Date(),
        login_count: 0
    };
}
async function getById(id) {
    const user = await (0, auth_repository_1.getUserById)(id);
    if (!user)
        return null;
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        created_at: user.created_at,
        last_login: user.last_login,
        login_count: user.login_count || 0
    };
}
