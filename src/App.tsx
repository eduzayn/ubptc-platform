import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import AdminLayout from './components/admin/AdminLayout';
import NotFoundPage from './pages/NotFoundPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import MembersPage from './pages/admin/MembersPage';
import CoursesPage from './pages/CoursesPage';
import ProfilePage from './pages/ProfilePage';
import LibraryPage from './pages/LibraryPage';
import CommunityPage from './pages/CommunityPage';
import CalendarEventsPage from './pages/CalendarEventsPage';
import AssociationPage from './pages/AssociationPage';
import CheckoutPage from './pages/CheckoutPage';
import AccountSettings from './pages/AccountSettings';

// Componente para proteger rotas administrativas
function RequireAuth({ children }: { children: React.ReactNode }) {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica o token ao montar o componente
    const checkAuth = () => {
      const token = localStorage.getItem('adminToken');
      setIsAuthenticated(!!token);
      setIsChecking(false);
    };

    checkAuth();

    // Verifica o token periodicamente (opcional)
    const interval = setInterval(checkAuth, 5 * 60 * 1000); // A cada 5 minutos

    return () => clearInterval(interval);
  }, []);

  // Mostra loading enquanto verifica
  if (isChecking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redireciona se não estiver autenticado
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Renderiza o conteúdo protegido se estiver autenticado
  return <>{children}</>;
}

export function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/calendar" element={<CalendarEventsPage />} />
        <Route path="/association" element={<AssociationPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        
        {/* Rotas de Perfil */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/settings" element={<AccountSettings />} />
        <Route path="/my-courses" element={<ProfilePage />} />

        {/* Rotas Administrativas (Protegidas) */}
        <Route
          path="/admin/*"
          element={
            <RequireAuth>
              <AdminLayout>
                <Routes>
                  <Route index element={<AdminDashboard />} />
                  <Route path="members" element={<MembersPage />} />
                  <Route path="courses/*" element={<AdminDashboard />} />
                  <Route path="content/*" element={<AdminDashboard />} />
                  <Route path="events/*" element={<AdminDashboard />} />
                  <Route path="settings/*" element={<AdminDashboard />} />
                  {/* Redireciona rotas admin inválidas para o dashboard */}
                  <Route path="*" element={<Navigate to="/admin" replace />} />
                </Routes>
              </AdminLayout>
            </RequireAuth>
          }
        />

        {/* Rota 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
