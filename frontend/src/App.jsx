import { useState, useEffect } from "react";
import Login from "./Login";
import Tasks from "./Task";
import Register from "./Register";
import AdminPanel from "./AdminPanel";
import ManagerPanel from "./ManagerPanel";

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [role, setRole] = useState(() => localStorage.getItem("role"));
  const [view, setView] = useState("login");

  // token gelince otomatik view ayarla
  useEffect(() => {
    if (token) {
      if (role === "admin") setView("admin");
      else if (role === "manager") setView("manager");
      else setView("tasks");
    } else {
      setView("login");
    }
  }, [token, role]);

  // login handler
  const handleSetToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
      setToken(newToken);

      const savedRole = localStorage.getItem("role");
      setRole(savedRole);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setToken(null);
      setRole(null);
    }
  };

  // SAYFA YÖNETİMİ
  if (!token) {
    return view === "login" ? (
      <Login setToken={handleSetToken} setView={setView} />
    ) : (
      <Register setView={setView} />
    );
  }

  if (view === "admin") {
    return <AdminPanel token={token} setView={setView} />;
  }

  if (view === "manager") {
    return <ManagerPanel token={token} setView={setView} />;
  }

  return <Tasks token={token} setToken={handleSetToken} setView={setView} />;
}