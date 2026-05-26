import { useEffect, useState } from "react";
import axios from "axios";

export default function ManagerPanel({ token, setView }) {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Müdür hem kullanıcıları hem tüm görevleri analiz edebilmeli
    const fetchData = async () => {
      try {
        const tasksRes = await axios.get("http://localhost:3000/admin/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const usersRes = await axios.get("http://localhost:3000/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTasks(tasksRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        console.error("Veri çekilemedi", err);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f7fb",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "15px",
            marginBottom: "25px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div>
            <h1
              style={{
                color: "#2563eb",
                fontSize: "32px",
                marginBottom: "5px",
              }}
            >
              Manager Dashboard
            </h1>

            <p
              style={{
                color: "#6b7280",
                margin: 0,
              }}
            >
              Sistemdeki verilerin anlık analizi
            </p>
          </div>

          <button
            onClick={() => setView("tasks")}
            style={{
              backgroundColor: "#4f46e5",
              color: "white",
              border: "none",
              padding: "12px 18px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ← Görevlerime Dön
          </button>
        </div>

        {/* STATS CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          {/* USERS */}
          <div
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "15px",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h3 style={{ color: "#374151", marginBottom: "10px" }}>
              Total Users
            </h3>

            <div
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                color: "#2563eb",
              }}
            >
              {users.length}
            </div>
          </div>

          {/* TASKS */}
          <div
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "15px",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h3 style={{ color: "#374151", marginBottom: "10px" }}>
              Total Tasks
            </h3>

            <div
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                color: "#4f46e5",
              }}
            >
              {tasks.length}
            </div>
          </div>

          {/* COMPLETED */}
          <div
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "15px",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h3 style={{ color: "#374151", marginBottom: "10px" }}>
              Completed Tasks
            </h3>

            <div
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                color: "green",
              }}
            >
              {tasks.filter((t) => t.status === "done").length}
            </div>
          </div>

          {/* IN PROGRESS */}
          <div
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "15px",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h3 style={{ color: "#374151", marginBottom: "10px" }}>
              In Progress
            </h3>

            <div
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                color: "orange",
              }}
            >
              {tasks.filter((t) => t.status === "in-progress").length}
            </div>
          </div>
        </div>

        {/* ANALYSIS SECTION */}
        <div
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ marginBottom: "20px", color: "#111827" }}>
            Sistem İstatistikleri
          </h2>

          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li
              style={{
                padding: "12px 0",
                borderBottom: "1px solid #eee",
                color: "#374151",
              }}
            >
              <strong>Toplam Kayıtlı Kullanıcı:</strong> {users.length}
            </li>

            <li
              style={{
                padding: "12px 0",
                borderBottom: "1px solid #eee",
                color: "#374151",
              }}
            >
              <strong>Toplam Görev Sayısı:</strong> {tasks.length}
            </li>

            <li
              style={{
                padding: "12px 0",
                borderBottom: "1px solid #eee",
                color: "#374151",
              }}
            >
              <strong>Tamamlanmış Görev:</strong>{" "}
              {tasks.filter((t) => t.status === "done").length}
            </li>

            <li
              style={{
                padding: "12px 0",
                color: "#374151",
              }}
            >
              <strong>Devam Eden Görev:</strong>{" "}
              {tasks.filter((t) => t.status === "in-progress").length}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}