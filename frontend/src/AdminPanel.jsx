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
      alert("Admin verileri çekilemedi. Yetkiniz olmayabilir.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "800px", margin: "auto" }}>
      {/* Geri Dön Butonu */}
      <button 
        onClick={() => setView("tasks")} 
        style={{ marginBottom: "20px", padding: "10px", cursor: "pointer" }}
      >
        ← Görevlerime Dön
      </button>

      <h1 style={{ color: "#d32f2f" }}>Admin Paneli</h1>
      
      <section style={{ marginBottom: "40px" }}>
        <h2>Kullanıcı Yönetimi ({users.length})</h2>
        <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th><th>Email</th><th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td><td>{u.email}</td><td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Tüm Sistem Görevleri</h2>
        <ul>
          {allTasks.map(t => (
            <li key={t.id}>
              {t.title} - <strong>{t.status}</strong> (Kullanıcı ID: {t.userId})
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}