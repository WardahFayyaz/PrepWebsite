const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,   // no duplicate usernames
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,   // no duplicate emails
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6    // basic validation
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", UserSchema);
