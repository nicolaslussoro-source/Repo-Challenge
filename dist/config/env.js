"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const env_var_1 = require("env-var");
exports.envs = {
    PORT: (0, env_var_1.get)('PORT').default('3000').asPortNumber(),
    DB_HOST: (0, env_var_1.get)('DB_HOST').default('127.0.0.1').asString(),
    DB_PORT: (0, env_var_1.get)('DB_PORT').default('3306').asPortNumber(),
    DB_USER: (0, env_var_1.get)('DB_USER').default('root').asString(),
    DB_PASSWORD: (0, env_var_1.get)('DB_PASSWORD').asString(),
    DB_NAME: (0, env_var_1.get)('DB_NAME').default('challenge').asString(),
    JWT_SECRET: (0, env_var_1.get)('JWT_SECRET').asString(),
};
