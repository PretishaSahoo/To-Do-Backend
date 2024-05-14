const express = require('express');
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcryptjs');

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const hashpassword = bcrypt.hashSync(password);
        const user = new User({ email, username, password: hashpassword });
        await user.save();
        res.status(200).json({ message: "Signup successful" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user" });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "User not found. Please sign up first." });
        }
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const { password, ...others } = user._doc;
        res.status(200).json({ id: others._id });
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
});

module.exports = router;
