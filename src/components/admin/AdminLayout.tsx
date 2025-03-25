import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../layout/Navbar';
import { AdminSidebar } from './AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [showSidebar, setShowSidebar] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col h-screen">
        <Navbar
          onMenuToggle={() => setShowSidebar(!showSidebar)}
          username="Administrador"
          avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
          notificationCount={0}
          isAdmin={true}
          onLogout={handleLogout}
        />

        <div className="flex flex-1 overflow-hidden">
          <div
            className={`${
              showSidebar ? 'block' : 'hidden'
            } md:block flex-shrink-0`}
          >
            <AdminSidebar />
          </div>

          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
