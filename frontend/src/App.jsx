import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import NavbarLayout from "./components/auth/NavbarLayout";

export default function App() {
  const { token } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <Routes>
        {/* Routes with Navbar */}
        <Route element={<NavbarLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>

        {/* Auth Route */}
        <Route
          path="/auth"
          element={token ? <Navigate to="/dashboard" replace /> : <AuthPage />}
        />
      </Routes>
      <Toaster richColors />
    </div>
  );
}
