const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const RegisterModel = require('../models/userModel');
const JWT_SECRET_KEY = "dhsjf3423jhsdf3423df"

// Registration user with JWT authentication
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await RegisterModel.findOne({ username });

        if (user) {
            res.json({ data: [], status: true, message: "User Already exists" });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await RegisterModel.create({ username, password: hashedPassword });

            // Generate JWT Token
            const token = jwt.sign({ userId: newUser._id }, 'JWT_SECRET_KEY', { expiresIn: '1h' });

            res.json({ data: { token }, status: true, message: "User created" });
        }
    } catch (error) {
        res.json(error);
    }
});

// Login User with JWT authentication
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await RegisterModel.findOne({ username });

        if (user && bcrypt.compareSync(password, user.password)) {
            // Generate JWT Token
            const token = jwt.sign({ userId: user._id }, 'yourSecretKey', { expiresIn: '1h' });
            res.json({ data: { token }, status: true, message: "User Login Successfully" });
        } else {
            res.json({ data: [], status: false, message: "Unable to login" });
        }
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;
