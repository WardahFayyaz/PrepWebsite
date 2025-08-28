// server.js
const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// ========================
// Middleware & Config
// ========================
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Trust proxy (useful when behind reverse proxy like Nginx/Heroku)
app.set('trust proxy', 1);

// ========================
// MongoDB Atlas Connection
// ========================
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


// ========================
// Routes
// ========================
const authRoutes = require("./routes/auth");     
const contactRoutes = require("./routes/contact");

// Static pages
app.get("/", (req, res) => res.render("home"));
app.get("/login", (req, res) => res.render("login"));
app.get("/register", (req, res) => res.render("register"));
app.get("/about", (req, res) => res.render("about"));
app.get("/services", (req, res) => res.render("services"));
app.get("/pricing", (req, res) => res.render("pricing"));
app.get("/fbaprep", (req, res) => res.render("fbaprep"));
app.get("/terms-of-use", (req, res) => res.render("terms-of-use"));
app.get("/privacy-policy", (req, res) => res.render("privacy-policy"));

// Routers
app.use("/auth", authRoutes);     
app.use("/contact", contactRoutes);

// ========================
// Error Handling
// ========================
app.use((err, req, res, next) => {
  console.error("❌ Unhandled error:", err.stack || err);
  res.status(500).send("❌ Something went wrong!");
});

// Handle 404
app.use((req, res) => {
  res.status(404).send("❌ Page not found");
});

// ========================
// Start Server
// ========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// ========================
// Graceful Shutdown
// ========================
const shutdown = async (signal) => {
  console.log(`📴 ${signal} received. Shutting down gracefully...`);
  await mongoose.connection.close();
  process.exit(0);
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
