require("dotenv").config();
const express = require("express");
const cors = require("cors");

const sequelize = require("./src/config/db");

const authRoutes = require("./src/routes/authRoutes");
const taskRoutes = require("./src/routes/taskRoutes");
const adminRoutes = require("./src/routes/adminRoutes");

const authMiddleware = require("./src/middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// TEK KONTROL NOKTASI
app.use("/admin", authMiddleware, adminRoutes);

// PROTECTED TEST
app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Giriş yaptın!", user: req.user });
});

// DB
sequelize.sync({ alter: true }).then(() => {
  console.log("Database hazır");

  app.listen(3000, () => {
    console.log("Server running: http://localhost:3000");
  });
});