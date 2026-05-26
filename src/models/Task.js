const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM("todo", "in-progress", "done"),
    defaultValue: "todo",
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Task;