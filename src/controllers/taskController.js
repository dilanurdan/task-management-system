const Task = require("../models/Task");

// TASK OLUŞTUR
exports.createTask = async (req, res) => {
  try {
    // VALIDATION
    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      UserId: req.user.id,
    });

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// TASK LİSTELE
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { UserId: req.user.id },
    });

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// TASK SİL
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id } });

    if (!task) {
      return res.status(404).json({ message: "Görev bulunamadı" });
    }

    if (req.user.role !== "admin" && task.UserId !== req.user.id) {
      return res.status(403).json({ message: "Bu görevi silmeye yetkiniz yok" });
    }

    await task.destroy();

    res.json({ message: "Task başarıyla silindi" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// TASK GÜNCELLE
exports.updateTask = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    await Task.update(
      {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
      },
      {
        where: {
          id: req.params.id,
          UserId: req.user.id,
        },
      }
    );

    res.json({ message: "Task güncellendi" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// TASK STATUS FİLTRE
exports.getTasksByStatus = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: {
        UserId: req.user.id,
        status: req.params.status,
      },
    });

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};