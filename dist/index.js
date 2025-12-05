"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const metrics_1 = __importDefault(require("./routes/metrics"));
const db_1 = require("./db");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/auth', auth_1.default);
app.use('/metrics', metrics_1.default);
// Initialize DB (create tables if needed)
(0, db_1.init)().catch((err) => {
    console.error('Failed to initialize DB', err);
    process.exit(1);
});
const port = process.env.PORT || 3000;
app.listen(Number(port), () => {
    console.log(`Server listening on http://localhost:${port}`);
});
