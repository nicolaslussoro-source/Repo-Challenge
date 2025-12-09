"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = getUser;
exports.getUsers = getUsers;
const metrics_repository_1 = require("../repository/metrics.repository");
async function getUser(email) {
    const user = await (0, metrics_repository_1.getUserByEmail)(email);
    if (!user)
        return null;
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        created_at: user.created_at,
        last_login: user.last_login,
        login_count: user.login_count
    };
}
async function getUsers() {
    const users = await (0, metrics_repository_1.getAllUsers)();
    return users.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name,
        created_at: user.created_at,
        last_login: user.last_login,
        login_count: user.login_count
    }));
}
