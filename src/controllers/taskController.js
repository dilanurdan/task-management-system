const Task = require("../models/Task");

// 🔥 TASK OLUŞTUR
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      UserId: req.user.id,
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 TASK LİSTELE
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { UserId: req.user.id },
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 TASK SİL (ADMIN ONLY)
exports.deleteTask = async (req, res) => {
  try {
    // 🔥 SADECE ADMIN SİLEBİLİR
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Yetkin yok" });
    }

    await Task.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.json({ message: "Task silindi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 TASK GÜNCELLE
exports.updateTask = async (req, res) => {
  try {
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
    res.status(500).json({ error: err.message });
  }
};

// 🔥 TASK STATUS FİLTRE (EXTRA FEATURE)
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
    res.status(500).json({ error: err.message });
  }
};