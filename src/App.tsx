import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout';
import AdminLoginPage from './components/admin/AdminLoginPage';
import AdminPage from './components/admin/AdminPage';
import ProtectedRoute from './components/admin/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rota de Login Admin */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Rotas Administrativas Protegidas */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Routes>
                  <Route index element={<AdminPage />} />
                  {/* Adicione outras rotas administrativas aqui */}
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Redireciona / para /admin */}
        <Route path="/" element={<Navigate to="/admin" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
