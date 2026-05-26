import { useEffect, useState } from "react";
import axios from "axios";

export default function Tasks({ token, setToken, setView }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role");

  // TASK ÇEK
  const getTasks = async () => {
    if (!token) return;

    try {
      const res = await axios.get("http://localhost:3000/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(res.data);
    } catch (err) {
      console.error("Görevler çekilemedi:", err);

      if (err.response?.status === 401 || err.response?.status === 403) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  // TASK EKLE
  const addTask = async () => {
    if (!title.trim()) return;

    try {
      await axios.post(
        "http://localhost:3000/tasks",
        {
          title,
          description,
          status: "todo",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTitle("");
      setDescription("");

      getTasks();
    } catch (err) {
      alert("Görev eklenemedi");
    }
  };

  // TASK SİL
  const deleteTask = async (id) => {
    if (!window.confirm("Silmek istiyor musun?")) return;

    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      getTasks();
    } catch (err) {
      alert(err.response?.data?.message || "Silinemedi");
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.clear();

    setToken(null);
    setView("login");
  };

  useEffect(() => {
    getTasks();
  }, [token]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "auto" }}>

        {/* HEADER */}
        <div
          style={{
            background: "white",
            padding: 25,
            borderRadius: 18,
            marginBottom: 25,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 15,
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 34,
                color: "#111827",
                marginBottom: 5,
              }}
            >
              Task Dashboard
            </h1>

            <p style={{ color: "#6b7280" }}>
              Rol: {role?.toUpperCase()}
            </p>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            {role === "admin" && (
              <button
                onClick={() => setView("admin")}
                style={navBtn}
              >
                Admin
              </button>
            )}

            {role === "manager" && (
              <button
                onClick={() => setView("manager")}
                style={navBtn}
              >
                Manager
              </button>
            )}

            <button
              onClick={logout}
              style={{
                ...navBtn,
                background: "#dc2626",
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* STATS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 20,
            marginBottom: 30,
          }}
        >
          <div style={statCard}>
            <h3>Total Tasks</h3>

            <div style={statNumber}>
              {tasks.length}
            </div>
          </div>

          <div style={statCard}>
            <h3>Completed</h3>

            <div
              style={{
                ...statNumber,
                color: "green",
              }}
            >
              {tasks.filter(t => t.status === "done").length}
            </div>
          </div>

          <div style={statCard}>
            <h3>Todo</h3>

            <div
              style={{
                ...statNumber,
                color: "#f59e0b",
              }}
            >
              {tasks.filter(t => t.status === "todo").length}
            </div>
          </div>
        </div>

        {/* ADD TASK */}
        <div
          style={{
            background: "white",
            padding: 25,
            borderRadius: 18,
            marginBottom: 30,
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              marginBottom: 20,
              color: "#111827",
            }}
          >
            Yeni Görev Ekle
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 15,
            }}
          >
            <input
              placeholder="Başlık"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={inputStyle}
            />

            <textarea
              placeholder="Açıklama"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                ...inputStyle,
                minHeight: 100,
                resize: "none",
              }}
            />

            <button
              onClick={addTask}
              style={{
                background: "#4f46e5",
                color: "white",
                border: "none",
                padding: "14px",
                borderRadius: 10,
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Görev Ekle
            </button>
          </div>
        </div>

        {/* TASK LIST */}
        {loading ? (
          <p>Yükleniyor...</p>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            {tasks.map((t) => (
              <div
                key={t.id}
                style={{
                  background: "white",
                  padding: 22,
                  borderRadius: 18,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 15,
                }}
              >
                <div>
                  <h3
                    style={{
                      marginBottom: 8,
                      color: "#111827",
                    }}
                  >
                    {t.title}
                  </h3>

                  <p
                    style={{
                      color: "#6b7280",
                      marginBottom: 10,
                    }}
                  >
                    {t.description}
                  </p>

                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: 20,
                      color: "white",
                      fontWeight: "bold",
                      background:
                        t.status === "done"
                          ? "green"
                          : t.status === "in-progress"
                          ? "orange"
                          : "gray",
                    }}
                  >
                    {t.status}
                  </span>
                </div>

                <button
                  onClick={() => deleteTask(t.id)}
                  style={{
                    background: "#ef4444",
                    color: "white",
                    border: "none",
                    padding: "12px 18px",
                    borderRadius: 10,
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Sil
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

const navBtn = {
  background: "#4f46e5",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: 10,
  cursor: "pointer",
  fontWeight: "bold",
};

const statCard = {
  background: "white",
  padding: 25,
  borderRadius: 18,
  textAlign: "center",
  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
};

const statNumber = {
  fontSize: 38,
  fontWeight: "bold",
  marginTop: 10,
  color: "#4f46e5",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: 10,
  border: "1px solid #d1d5db",
  fontSize: 15,
  outline: "none",
  boxSizing: "border-box",
};