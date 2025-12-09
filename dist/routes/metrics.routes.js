"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const metrics_service_1 = require("../services/metrics.service");
const router = (0, express_1.Router)();
router.get('/user/:email', auth_1.authenticate, async (req, res) => {
    const { email } = req.params;
    if (!email)
        return res.status(400).json({ error: 'email required' });
    const metrics = await (0, metrics_service_1.getUser)(email);
    return res.status(200).json(metrics);
});
router.get('/admin', auth_1.authenticate, async (req, res) => {
    const users = await (0, metrics_service_1.getUsers)();
    return res.status(200).json(users);
});
exports.default = router;
