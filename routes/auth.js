const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user"); // import User model

// ========================
// GET Register Page
// ========================
router.get("/register", (req, res) => {
    res.render("register"); // make sure you have views/register.ejs
});

// ========================
// POST Register (Save User)
// ========================
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.send("⚠️ User with this email already exists!");
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.send("✅ User registered successfully! <a href='/login'>Login Now</a>");
    } catch (err) {
        console.error(err);
        res.status(500).send("❌ Error registering user");
    }
});

// ========================
// GET Login Page
// ========================
router.get("/login", (req, res) => {
    res.render("login"); // make sure you have views/login.ejs
});

// ========================
// POST Login
// ========================
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.send("⚠️ User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.send("❌ Invalid password");
        }

        // On success - redirect to home
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("❌ Error logging in");
    }
});

// ========================
// List All Users (for testing/admin)
// ========================
router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users); // show all users in JSON format
    } catch (err) {
        res.status(500).send("❌ Error fetching users");
    }
});

module.exports = router;
