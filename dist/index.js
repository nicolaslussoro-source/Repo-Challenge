"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const metrics_routes_1 = __importDefault(require("./routes/metrics.routes"));
const db_1 = require("./db");
const env_1 = require("./config/env");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/auth', auth_routes_1.default);
app.use('/metrics', metrics_routes_1.default);
(0, db_1.init)().catch((err) => {
    console.error('Failed to initialize DB', err);
    process.exit(1);
});
app.listen(env_1.envs.PORT, () => {
    console.log(`Server listening on http://localhost:${env_1.envs.PORT}`);
});
