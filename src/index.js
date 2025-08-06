const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Add a test route
app.get("/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

try {
  const userController = require("./controllers/userController");
  app.use("/api", userController);
  console.log("✅ userController loaded successfully");
} catch (e) {
  console.error("❌ Error loading userController:", e);
}

try {
  const chileanCompanyController = require("./controllers/chileanCompanyController");
  app.use("/api", chileanCompanyController);
  console.log("✅ chileanCompanyController loaded successfully");
} catch (e) {
  console.error("❌ Error loading chileanCompanyController:", e);
}

try {
  const mantenedoresController = require("./controllers/mantenedoresController");
  app.use("/api", mantenedoresController);
  console.log("✅ mantenedoresController loaded successfully");
} catch (e) {
  console.error("❌ Error loading mantenedoresController:", e);
}

// Add route debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Server is still running");
});

// Keep the process alive
process.on("SIGINT", () => {
  console.log("Shutting down server...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

