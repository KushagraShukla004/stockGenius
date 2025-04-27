/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const menuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
  };

  const isActiveRoute = (path) => location.pathname === path;

  const navLinks = token
    ? [
        { to: "/dashboard", label: "Dashboard" },
        { to: "/profile", label: "Profile" },
      ]
    : [];

  return (
    <>
      <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="text-primary text-2xl md:text-3xl font-bold tracking-wide hover:opacity-90 transition-opacity"
            >
              StockGenius
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to}>
                  <Button
                    variant={isActiveRoute(link.to) ? "default" : "ghost"}
                    className="text-sm font-semibold hover:scale-105 transition-transform"
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
              {token ? (
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  className="text-sm font-semibold hover:bg-destructive/90 transition-colors"
                >
                  Logout
                </Button>
              ) : (
                <Link to="/auth">
                  <Button
                    variant="default"
                    className="text-sm font-semibold bg-primary hover:bg-primary/90 transition-colors"
                  >
                    Login
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-muted/20 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6 text-foreground" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dialog */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Menu Dialog */}
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="fixed top-4 right-4 left-4 z-50 bg-background rounded-lg shadow-xl border border-border"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-primary text-2xl md:text-3xl font-bold tracking-wide hover:opacity-90 transition-opacity">
                    StockGenius
                  </span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-muted/20 rounded-lg transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6 text-foreground" />
                  </button>
                </div>

                <div className="space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                        isActiveRoute(link.to)
                          ? "bg-secondary text-secondary-foreground"
                          : "text-foreground hover:bg-muted/20"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}

                  {token ? (
                    <Button
                      variant="destructive"
                      onClick={handleLogout}
                      className="w-full mt-4 text-sm font-semibold"
                    >
                      Logout
                    </Button>
                  ) : (
                    <Link
                      to="/auth"
                      onClick={() => setIsMenuOpen(false)}
                      className="block mt-4"
                    >
                      <Button
                        variant="default"
                        className="w-full text-sm font-semibold bg-primary hover:bg-primary/90 transition-colors"
                      >
                        Login
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
