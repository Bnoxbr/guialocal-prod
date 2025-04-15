import { Routes, Route } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import Home from "./components/home";
import SearchResults from "./components/SearchResults";
import BookingConfirmation from "./components/BookingConfirmation";
import GuideDashboard from "./components/dashboard/GuideDashboard";
import { LoginForm } from "./components/auth/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/admin/AdminDashboard";
import TourDetail from "./components/TourDetail";

const App = () => {
  return (
    <>
      {/* For the tempo routes */}
      {import.meta.env.VITE_TEMPO && useRoutes(routes)}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/booking/:guideId" element={<BookingConfirmation />} />
        <Route path="/tour/:tourId" element={<TourDetail />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRole="guide">
              <GuideDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <div className="p-8">Página de Perfil do Usuário</div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reservas"
          element={
            <ProtectedRoute>
              <div className="p-8">Minhas Reservas</div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/parceiro/dashboard"
          element={
            <ProtectedRoute requiredRole="guide">
              <div className="p-8">Painel do Parceiro</div>
            </ProtectedRoute>
          }
        />

        {/* Admin route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Add this before the catchall route */}
        {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
      </Routes>
    </>
  );
};

export default App;
