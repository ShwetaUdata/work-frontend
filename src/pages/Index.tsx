import { useState, useEffect } from "react";
import { Login } from "@/components/Login";
import { EmployeeDashboard } from "@/components/EmployeeDashboard";
import { AdminDashboard } from "@/components/AdminDashboard";
import { User } from "@/types";

const Index = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Failed to parse saved user", err);
        localStorage.removeItem("currentUser");
      }
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  if (currentUser.role === "admin") {
    return <AdminDashboard user={currentUser} onLogout={handleLogout} />;
  }

  return <EmployeeDashboard user={currentUser} onLogout={handleLogout} />;
};

export default Index;
