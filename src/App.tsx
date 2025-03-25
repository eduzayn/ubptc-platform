import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminLayout from './components/admin/AdminLayout';
import NotFoundPage from './pages/NotFoundPage';
import AdminDashboard from './pages/admin/AdminDashboard';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('adminToken');
  
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/admin/*"
          element={
            <RequireAuth>
              <AdminLayout>
                <Routes>
                  <Route index element={<AdminDashboard />} />
                </Routes>
              </AdminLayout>
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
