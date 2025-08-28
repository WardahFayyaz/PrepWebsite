const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

// ========================
// GET Contact Page
// ========================
router.get("/", (req, res) => {
    res.render("contact"); // make sure you have views/contact.ejs
});

// ========================
// POST Contact (Save Message)
// ========================
router.post("/", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Basic validation
        if (!name || !email || !message) {
            return res.json({ success: false, message: "⚠ Please fill in all fields!" });
        }

        if (name.length < 2 || name.length > 100) {
            return res.json({ success: false, message: "⚠ Name must be between 2 and 100 characters!" });
        }

        if (message.length < 10 || message.length > 1000) {
            return res.json({ success: false, message: "⚠ Message must be between 10 and 1000 characters!" });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.json({ success: false, message: "⚠ Please enter a valid email address!" });
        }

        // Save contact
        const newContact = new Contact({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            message: message.trim(),
            ipAddress: req.ip || req.connection.remoteAddress,
            userAgent: req.get("User-Agent")
        });

        await newContact.save();
        res.json({ success: true, message: "✅ Thank you for your message!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "❌ Error sending message" });
    }
});

// ========================
// GET All Messages (Admin)
// ========================
router.get("/messages", async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "❌ Error fetching messages" });
    }
});

// ========================
// GET Unread Messages Count
// ========================
router.get("/messages/unread", async (req, res) => {
    try {
        const unreadCount = await Contact.countDocuments({ isRead: false });
        res.json({ unreadCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "❌ Error fetching unread count" });
    }
});

// ========================
// Mark Message as Read
// ========================
router.patch("/messages/:id/read", async (req, res) => {
    try {
        const message = await Contact.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );

        if (!message) {
            return res.status(404).json({ success: false, message: "❌ Message not found" });
        }

        res.json({ success: true, message: "Message marked as read" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "❌ Error updating message" });
    }
});

// ========================
// Delete Message
// ========================
router.delete("/messages/:id", async (req, res) => {
    try {
        const message = await Contact.findByIdAndDelete(req.params.id);

        if (!message) {
            return res.status(404).json({ success: false, message: "❌ Message not found" });
        }

        res.json({ success: true, message: "Message deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "❌ Error deleting message" });
    }
});

module.exports = router;
