import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-zinc-400/20 shadow-md border-b border-slate-500 backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        {/* Logo */}
        <Link to="/" className="text-primary text-4xl font-bold tracking-wide">
          StockGenius
        </Link>

        {/* Links */}
        <div className="space-x-4 flex items-center">
          {token && (
            <>
              <Link to="/dashboard">
                <Button
                  variant={isActiveRoute("/dashboard") ? "secondary" : "ghost"}
                  className="text-md font-semibold  text-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors"
                >
                  Dashboard
                </Button>
              </Link>

              <Link to="/watchlist">
                <Button
                  variant={isActiveRoute("/watchlist") ? "secondary" : "ghost"}
                  className="text-md font-semibold  text-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors"
                >
                  Watchlist
                </Button>
              </Link>
              <Link to="/profile">
                <Button
                  variant={isActiveRoute("/profile") ? "secondary" : "ghost"}
                  className="text-md font-semibold  text-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors"
                >
                  Profile
                </Button>
              </Link>
            </>
          )}

          {token ? (
            <Button
              variant="destructive"
              className="text-md font-semibold  hover:bg-destructive/90 transition-colors"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Link to="/auth">
              <Button
                variant="default"
                className="text-md font-semibold  bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
