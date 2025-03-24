import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLoginModal from '../admin/AdminLoginModal';

interface NavbarProps {
  onMenuToggle: () => void;
  username?: string;
  avatarUrl?: string;
  notificationCount: number;
  isAdmin?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  onMenuToggle,
  username,
  avatarUrl,
  notificationCount,
  isAdmin
}) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAdminClick = () => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLogin = async (email: string, cpf: string) => {
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, cpf }),
      });

      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }

      const { token } = await response.json();
      localStorage.setItem('adminToken', token);
      setIsLoginModalOpen(false);
      navigate('/admin');
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        {/* ... resto do código do Navbar ... */}
        
        {/* Botão do Administrador */}
        <button
          onClick={handleAdminClick}
          className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg"
        >
          <img
            src={avatarUrl}
            alt="Admin"
            className="h-8 w-8 rounded-full"
          />
          <span className="text-sm font-medium">Administrador</span>
        </button>
      </nav>

      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </>
  );
};

export default Navbar;
