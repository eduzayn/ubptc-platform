import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminLayout from './components/admin/AdminLayout';
import NotFoundPage from './pages/NotFoundPage';

// Componente de proteção simplificado
function RequireAuth({ children }: { children: React.ReactNode }) {
  // Verifica se existe token
  const token = localStorage.getItem('adminToken');
  
  // Se não tiver token, redireciona para home
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Se tiver token, renderiza o conteúdo protegido
  return children;
}

export function App() {
  return (
    <Router>
      <Routes>
        {/* Rota pública */}
        <Route path="/" element={
