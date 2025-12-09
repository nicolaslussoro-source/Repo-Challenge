"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_service_1 = require("../services/auth.service");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/login', async (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password)
        return res.status(400).json({ error: 'email and password are required' });
    try {
        const token = await (0, auth_service_1.login)({ email, password });
        if (!token)
            return res.status(401).json({ error: 'invalid credentials' });
        return res.json({ token });
    }
    catch (err) {
        console.error('Login error', err);
        return res.status(500).json({ error: 'internal error' });
    }
});
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body || {};
    if (!email || !password)
        return res.status(400).json({ error: 'email and password are required' });
    try {
        const user = await (0, auth_service_1.register)({ name: name, email, password });
        return res.status(201).json({ id: user.id, email: user.email, name: user.name });
    }
    catch (err) {
        console.error('Register error', err);
        return res.status(400).json({ error: err.message || 'cannot register user' });
    }
});
router.get('/me', auth_1.authenticate, async (req, res) => {
    const userId = req.body.sub;
    if (!userId)
        return res.status(401).json({ error: 'unauthorized' });
    const user = await (0, auth_service_1.getById)(userId);
    if (!user)
        return res.status(404).json({ error: 'user not found' });
    return res.status(200).json(user);
});
exports.default = router;
