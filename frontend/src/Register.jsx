import { useState } from "react";
import axios from "axios";

export default function Register({ setView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await axios.post("http://localhost:3000/auth/register", {
        email,
        password,
      });

      alert("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");

      setView("login"); // Başarılı olunca login ekranına dön
    } catch (err) {
      alert(
        "Kayıt başarısız: " +
          (err.response?.data?.message || "Bir hata oluştu")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f7fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#111827",
            fontSize: "32px",
          }}
        >
          Create Account
        </h2>

        <p
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#6b7280",
          }}
        >
          Yeni hesap oluşturun
        </p>

        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#374151",
                fontWeight: "bold",
              }}
            >
              Email
            </label>

            <input
              type="email"
              placeholder="ornek@email.com"
              required
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #d1d5db",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#374151",
                fontWeight: "bold",
              }}
            >
              Şifre
            </label>

            <input
              type="password"
              placeholder="Şifrenizi girin"
              required
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #d1d5db",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#4f46e5",
              color: "white",
              fontWeight: "bold",
              fontSize: "15px",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            {loading ? "Kaydediliyor..." : "Kayıt Ol"}
          </button>
        </form>

        <p
          style={{
            marginTop: "25px",
            textAlign: "center",
            color: "#6b7280",
          }}
        >
          Zaten hesabın var mı?{" "}
          <button
            onClick={() => setView("login")}
            style={{
              border: "none",
              background: "none",
              color: "#4f46e5",
              cursor: "pointer",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            Giriş Yap
          </button>
        </p>
      </div>
    </div>
  );
}