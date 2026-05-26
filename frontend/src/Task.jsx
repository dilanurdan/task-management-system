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
        { title, description, status: "todo" },
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
    <div style={{ minHeight: "100vh", background: "#f4f7fb", padding: 40 }}>
      <div style={{ maxWidth: 1000, margin: "auto" }}>

        {/* HEADER */}
        <div style={{
          background: "white",
          padding: 20,
          borderRadius: 15,
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <h2>Task Dashboard ({role?.toUpperCase()})</h2>

          <div style={{ display: "flex", gap: 10 }}>
            {role === "admin" && (
              <button onClick={() => setView("admin")}>
                Admin
              </button>
            )}

            {role === "manager" && (
              <button onClick={() => setView("manager")}>
                Manager
              </button>
            )}

            <button onClick={logout} style={{ background: "red", color: "white" }}>
              Logout
            </button>
          </div>
        </div>

        {/* STATS */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          <div>Toplam: {tasks.length}</div>
          <div>Done: {tasks.filter(t => t.status === "done").length}</div>
          <div>Todo: {tasks.filter(t => t.status === "todo").length}</div>
        </div>

        {/* ADD TASK */}
        <div style={{ marginBottom: 20 }}>
          <input
            placeholder="Başlık"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            placeholder="Açıklama"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button onClick={addTask}>Ekle</button>
        </div>

        {/* LIST */}
        {loading ? (
          <p>Yükleniyor...</p>
        ) : (
          tasks.map((t) => (
            <div key={t.id} style={{
              background: "white",
              padding: 15,
              marginBottom: 10,
              borderRadius: 10,
              display: "flex",
              justifyContent: "space-between"
            }}>
              <div>
                <b>{t.title}</b>
                <p>{t.description}</p>
                <small>{t.status}</small>
              </div>

              <button onClick={() => deleteTask(t.id)} style={{ color: "red" }}>
                Sil
              </button>
            </div>
          ))
        )}

      </div>
    </div>
  );
}