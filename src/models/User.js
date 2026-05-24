const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// 1️⃣ ÖNCE User tanımla
const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("admin", "manager", "user"),
    defaultValue: "user",
  },
});

// 2️⃣ SONRA Task import et
const Task = require("./Task");

// 3️⃣ SONRA ilişki kur
User.hasMany(Task);
Task.belongsTo(User);

module.exports = User;