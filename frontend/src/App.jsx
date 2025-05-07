import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "sonner";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import NavbarLayout from "./components/auth/NavbarLayout";
import AdminRoute from "./components/auth/AdminRoute";
import AdminPage from "./pages/AdminPage";

export default function App() {
  const { token } = useSelector((state) => state.auth);

  return (
    <>
      <div className="min-h-screen bg-background dark:bg-background">
        <Routes>
          {/* Routes with Navbar */}
          <Route element={<NavbarLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<ProfilePage />} />
              {/* Admin Routes */}
              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminPage />} />
              </Route>
            </Route>
          </Route>

          {/* Auth Route */}
          <Route
            path="/auth"
            element={token ? <Navigate to="/dashboard" replace /> : <AuthPage />}
          />
        </Routes>
      </div>
      <Toaster position="top-right" expand richColors closeButton />
    </>
  );
}
