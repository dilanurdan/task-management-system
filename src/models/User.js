const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

//  ÖNCE User tanımlarız
const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
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

// SONRA Task import ettik
const Task = require("./Task");

// SONRA ilişki kurulur
User.hasMany(Task);
Task.belongsTo(User);

module.exports = User;