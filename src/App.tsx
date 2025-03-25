import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AdminLayout from './components/admin/AdminLayout';
import AdminLoginModal from './components/admin/AdminLoginModal';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import { useToast } from '@/components/ui/use-toast';

// Interface para o estado de autenticação
interface AuthState {
  isAuthenticated: boolean | null;
  isLoading: boolean;
}

// Componente para proteger rotas
const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: null,
    isLoading: true
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    setAuthState({
      isAuthenticated: !!token,
      isLoading: false
    });
    
    if (!token) {
      setIsLoginModalOpen(true);
    }
  };

  const handleLogin = async (email: string, cpf: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
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
      
      setAuthState({
        isAuthenticated: true,
        isLoading: false
      });
      
      setIsLoginModalOpen(false);
      
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo ao painel administrativo",
        variant: "default",
      });

    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      
      toast({
        title: "Erro no login",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao tentar fazer login",
        variant: "destructive",
      });
      
      throw error;
    }
  };

  // Verificação periódica do token (a cada 5 minutos)
  useEffect(() => {
    const interval = setInterval(checkAuth, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (authState.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    return (
      <>
        <Navigate to="/" replace />
        <AdminLoginModal
          isOpen={isLoginModalOpen}
          onClose={() => {
            setIsLoginModalOpen(false);
            // Redireciona para home ao fechar o modal
            window.location.href = '/';
          }}
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
              <AdminLayout>
                <Routes>
                  <Route index element={<AdminDashboard />} />
                  {/* Adicione outras rotas administrativas aqui */}
                  <Route path="*" element={<Navigate to="/admin" replace />} />
                </Routes>
              </AdminLayout>
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
