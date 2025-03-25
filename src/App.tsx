import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AdminLayout from './components/admin/AdminLayout';
import AdminLoginModal from './components/admin/AdminLoginModal';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

// Componente para proteger rotas
const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setIsAuthenticated(!!token);
    if (!token) {
      setIsLoginModalOpen(true);
    }
  }, []);

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
      setIsAuthenticated(true);
      setIsLoginModalOpen(false);
    } catch (error) {
      throw error;
    }
  };

  if (isAuthenticated === null) {
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    return (
      <>
        <Navigate to="/" replace />
        <AdminLoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={handleLogin}
        />
      </>
    );
  }

  return <>{children}</>;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Página inicial */}
        <Route path="/" element={<HomePage />} />

        {/* Rotas administrativas protegidas */}
        <Route
          path="/admin/*"
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        />

        {/* Rota para página não encontrada */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
