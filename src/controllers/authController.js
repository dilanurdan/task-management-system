require('dotenv').config();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // VALIDATION
    if (!email || !password) {
      return res.status(400).json({ message: "Email ve şifre gereklidir." });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Şifre yanlış" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// REGISTER
exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // VALIDATION
    if (!email || !password) {
      return res.status(400).json({ message: "Email ve şifre gereklidir." });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Şifre en az 6 karakter olmalıdır." });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Bu email zaten kullanımda!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: email.split("@")[0],
      email,
      password: hashedPassword,
      role: role || "user"
    });

    res.status(201).json({ message: "Kayıt başarılı!" });
  } catch (error) {
    console.error("Kayıt sırasında hata:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};