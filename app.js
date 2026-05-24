require("dotenv").config();

const express = require("express");
const sequelize = require("./src/config/db"); // 🔥 EKLE

const authRoutes = require("./src/routes/authRoutes");
const taskRoutes = require("./src/routes/taskRoutes");
const authMiddleware = require("./src/middleware/authMiddleware");

const app = express();

app.use(express.json());

// ROUTES
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// PROTECTED
app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Giriş yaptın!", user: req.user });
});

// 🔥 EN KRİTİK KISIM
sequelize.sync().then(() => {
  console.log("Database hazır");

  app.listen(3000, () => {
    console.log("Server çalışıyor: http://localhost:3000");
  });
});