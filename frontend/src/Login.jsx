import { useState } from "react";
import axios from "axios";

export default function Login({ setToken, setView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    if (e) e.preventDefault();

    if (!email || !password) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      // 🔥 TOKEN + ROLE KAYDET
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // 🔥 STATE + YÖNLENDİRME
      setToken(res.data.token);

      // role’e göre yönlendir (FIX)
      if (res.data.role === "admin") {
        setView("admin");
      } else if (res.data.role === "manager") {
        setView("manager");
      } else {
        setView("tasks");
      }

    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Giriş başarısız, tekrar deneyin.";

      alert("Hata: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f4f7fb",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial, sans-serif",
      padding: "20px",
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "20px",
        width: "100%",
        maxWidth: "420px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}>
        <h2 style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#111827",
          fontSize: "32px",
        }}>
          Task Management
        </h2>

        <form onSubmit={login}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            style={{ width: "100%", padding: "14px", marginBottom: "10px" }}
          />

          <input
            type="password"
            placeholder="Şifre"
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            style={{ width: "100%", padding: "14px", marginBottom: "10px" }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "#4f46e5",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontWeight: "bold",
            }}
          >
            {loading ? "Giriş yapılıyor..." : "Login"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Hesabın yok mu?{" "}
          <button
            onClick={() => setView("register")}
            style={{ background: "none", border: "none", color: "#4f46e5" }}
          >
            Kayıt Ol
          </button>
        </p>
      </div>
    </div>
  );
}