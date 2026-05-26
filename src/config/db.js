require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "task_db",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "danlar",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false, // Konsolda gereksiz SQL sorgularını gizle
  }
);

module.exports = sequelize;