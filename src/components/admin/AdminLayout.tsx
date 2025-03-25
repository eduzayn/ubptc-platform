import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import AdminSidebar from "./AdminSidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const navigate = useNavigate();

  // Verificação de autenticação ao montar o componente
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  // Verificação periódica do token (opcional, a cada 5 minutos)
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/");
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Handler para logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col h-screen">
        <Navbar
          onMenuToggle={toggleSidebar}
          username="Administrador"
          avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
          notificationCount={0}
          isAdmin={true}
          onLogout={handleLogout} // Adicionado handler de logout
        />

        <div className="flex flex-1 overflow-hidden">
          <div
            className={`${
              showSidebar ? "block" : "hidden"
            } md:block flex-shrink-0`}
          >
            <AdminSidebar />
          </div>

          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Wrapper para garantir que o conteúdo só é renderizado se autenticado */}
              {localStorage.getItem("adminToken") ? (
                children
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p>Redirecionando...</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
