"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const metricsService_1 = require("../services/metricsService");
const router = (0, express_1.Router)();
router.get('/:email', auth_1.authenticate, async (req, res) => {
    const { email } = req.params;
    if (!email)
        return res.status(400).json({ error: 'email required' });
    const metrics = await (0, metricsService_1.getUser)(email);
    return res.status(200).json(metrics);
});
router.get('/admin', auth_1.authenticate, async (req, res) => {
    console.log('Fetching all users metrics');
    const allMetrics = await (0, metricsService_1.getAllUsers)();
    return res.status(200).json(allMetrics);
});
exports.default = router;
