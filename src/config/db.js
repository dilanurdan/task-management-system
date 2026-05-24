const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  "task_db",
  "root",
  "danlar",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = sequelize;