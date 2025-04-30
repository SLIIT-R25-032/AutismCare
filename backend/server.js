const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// Import Routes
const userRoute = require("./routers/user.router");
const learningRoute = require("./routers/learningsession.router");
const emailRoute = require("./routers/email.router");

// App Config
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
const URI = process.env.MONGODB;
mongoose
  .connect(URI, { dbName: "mydatabase" })
  .then(() => console.log("✅ Database is connected"))
  .catch((err) => console.error("❌ Database connection error:", err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoute);
app.use("/api/learning", learningRoute);
app.use("/api/email", emailRoute);

// Server startup
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
