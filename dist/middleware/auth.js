"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'] || '';
    const parts = (Array.isArray(authHeader) ? authHeader[0] : authHeader).split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer')
        return res.status(401).json({ error: 'missing token' });
    const token = parts[1];
    try {
        const JWT_SECRET = env_1.envs.JWT_SECRET;
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.body = payload;
        return next();
    }
    catch (err) {
        return res.status(401).json({ error: 'invalid token' });
    }
}
