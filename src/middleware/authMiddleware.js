const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Token yok" });
  }

  const parts = authHeader.split(" ");
  const token = parts[1];

  if (parts.length !== 2 || parts[0] !== "Bearer" || !token) {
    return res.status(401).json({ message: "Token formatı hatalı" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.error("JWT Doğrulama Hatası:", error.message);

    return res.status(403).json({ message: "Geçersiz veya süresi dolmuş token" });
  }
};