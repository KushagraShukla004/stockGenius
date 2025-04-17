import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import NavbarLayout from "./components/auth/NavbarLayout";
import Watchlist from "./pages/Watchlist";

export default function App() {
  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <Routes>
        {/* Routes with Navbar with child rendering using <Outlet/>*/}
        <Route element={<NavbarLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Route>
        </Route>

        {/* Routes without Navbar */}
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
      <Toaster richColors />
    </div>
  );
}
