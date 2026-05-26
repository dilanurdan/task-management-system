import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPanel({ token, setView }) {
  const [users, setUsers] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const usersRes = await axios.get("http://localhost:3000/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const tasksRes = await axios.get("http://localhost:3000/admin/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(usersRes.data);
      setAllTasks(tasksRes.data);

    } catch (err) {
      alert("Admin verileri çekilemedi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "22px",
      }}>
        Yükleniyor...
      </div>
    );
  }

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
          maxWidth: "1200px",
          margin: "auto",
        }}
      >

        {/* HEADER */}
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "18px",
            marginBottom: "25px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <div>
            <h1
              style={{
                color: "#dc2626",
                marginBottom: "5px",
                fontSize: "34px",
              }}
            >
              Admin Dashboard
            </h1>

            <p style={{ color: "#6b7280" }}>
              Sistem kullanıcı ve görev yönetimi
            </p>
          </div>

          <button
            onClick={() => setView("tasks")}
            style={{
              backgroundColor: "#4f46e5",
              color: "white",
              border: "none",
              padding: "12px 18px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ← Görevlerime Dön
          </button>
        </div>

        {/* STATS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "15px",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h3>Total Users</h3>

            <div
              style={{
                fontSize: "38px",
                fontWeight: "bold",
                color: "#dc2626",
                marginTop: "10px",
              }}
            >
              {users.length}
            </div>
          </div>

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "15px",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h3>Total Tasks</h3>

            <div
              style={{
                fontSize: "38px",
                fontWeight: "bold",
                color: "#4f46e5",
                marginTop: "10px",
              }}
            >
              {allTasks.length}
            </div>
          </div>

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "15px",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h3>Completed</h3>

            <div
              style={{
                fontSize: "38px",
                fontWeight: "bold",
                color: "green",
                marginTop: "10px",
              }}
            >
              {allTasks.filter(t => t.status === "done").length}
            </div>
          </div>
        </div>

        {/* USERS TABLE */}
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            marginBottom: "30px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
              color: "#111827",
            }}
          >
            Kullanıcı Yönetimi
          </h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr style={{ background: "#f3f4f6" }}>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Rol</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td style={tdStyle}>{u.id}</td>
                  <td style={tdStyle}>{u.email}</td>

                  <td style={tdStyle}>
                    <span
                      style={{
                        padding: "6px 12px",
                        borderRadius: "20px",
                        color: "white",
                        background:
                          u.role === "admin"
                            ? "#dc2626"
                            : u.role === "manager"
                            ? "#2563eb"
                            : "#6b7280",
                      }}
                    >
                      {u.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TASKS */}
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
              color: "#111827",
            }}
          >
            Tüm Sistem Görevleri
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            {allTasks.map((t) => (
              <div
                key={t.id}
                style={{
                  background: "#f9fafb",
                  padding: "18px",
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <div>
                  <h3 style={{ marginBottom: "6px" }}>
                    {t.title}
                  </h3>

                  <p style={{ color: "#6b7280" }}>
                    Kullanıcı ID: {t.UserId}
                  </p>
                </div>

                <span
                  style={{
                    padding: "8px 14px",
                    borderRadius: "20px",
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
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

const thStyle = {
  padding: "14px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
};

const tdStyle = {
  padding: "14px",
  borderBottom: "1px solid #eee",
};