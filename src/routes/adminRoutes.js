const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Task = require("../models/Task");

// USERS (admin + manager)
router.get("/users", async (req, res) => {
  if (req.user.role !== "admin" && req.user.role !== "manager") {
    return res.status(403).json({ message: "Access denied" });
  }

  const users = await User.findAll();
  res.json(users);
});

// STATS (sadece admin)
router.get("/stats", async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const userCount = await User.count();
  const taskCount = await Task.count();

  res.json({ userCount, taskCount });
});

// ALL TASKS (admin + manager)
router.get("/tasks", async (req, res) => {
  if (req.user.role !== "admin" && req.user.role !== "manager") {
    return res.status(403).json({ message: "Access denied" });
  }

  const tasks = await Task.findAll();
  res.json(tasks);
});

module.exports = router;