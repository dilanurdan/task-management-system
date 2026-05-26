const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
  getTasksByStatus
} = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");

// TASK OLUŞTUR
router.post("/", authMiddleware, createTask);

// TASK LİSTELE
router.get("/", authMiddleware, getTasks);

// TASK SİL
router.delete("/:id", authMiddleware, deleteTask);

// TASK GÜNCELLE
router.put("/:id", authMiddleware, updateTask);

// TASK STATUS FİLTRE
router.get("/status/:status", authMiddleware, getTasksByStatus);

module.exports = router;