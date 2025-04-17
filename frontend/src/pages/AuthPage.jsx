/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "motion/react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="w-screen h-screen flex overflow-hidden">
      {/* Left Panel */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex flex-col justify-center items-start w-1/2 h-full px-12 text-white rounded-r-2xl"
        style={{
          backgroundColor: "oklch(0.18 0.03 260)",
          backgroundImage: `
      radial-gradient(ellipse at 20% 30%, rgba(104, 66, 255, 0.3) 0%, transparent 40%),
      radial-gradient(ellipse at 80% 20%, rgba(0, 255, 186, 0.15) 0%, transparent 75%),
      radial-gradient(ellipse at 50% 80%, rgba(255, 63, 103, 0.15) 0%, transparent 35%),
      radial-gradient(ellipse at 40% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 80%)
    `,
          backgroundBlendMode: "soft-light",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="space-y-6 max-w-lg">
          <h1 className="text-5xl font-extrabold leading-tight text-white drop-shadow-[0_0_6px_rgba(0,0,0,0.6)]">
            <span className="bg-gradient-to-r from-primary from-30% via-indigo-500 to-secondary bg-clip-text text-transparent">
              Discover the hidden gems of the market.
            </span>
          </h1>

          <p className="mt-4 text-lg text-foreground/80 drop-shadow-sm">
            One insight at a time. Let StockGenius AI decode the charts, fundamentals, and
            patterns for you.
          </p>
        </div>
      </motion.div>

      {/* Right Panel */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex justify-center items-center w-full lg:w-1/2 h-full bg-background"
      >
        <div className="w-full max-w-md p-6 sm:p-8 bg-zinc-700 rounded-2xl shadow-xl">
          {/* Tab Switch */}
          <div className="flex justify-around mb-6 bg-muted/10 p-2 rounded-xl ring-1 ring-ring/20">
            <button
              className={`flex-1 px-4 py-2 font-medium rounded-lg transition-all duration-200 ${
                activeTab === "login"
                  ? "bg-primary/90 text-white shadow-md scale-105"
                  : "text-muted-foreground hover:bg-muted/20"
              }`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={`flex-1 px-4 py-2 font-medium rounded-lg transition-all duration-200 ${
                activeTab === "register"
                  ? "bg-primary/90 text-white shadow-md scale-105"
                  : "text-muted-foreground hover:bg-muted/20"
              }`}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>

          {/* Form Area */}
          <div className="w-full">
            {activeTab === "login" ? (
              <Login switchToRegister={() => setActiveTab("register")} />
            ) : (
              <Register switchToLogin={() => setActiveTab("login")} />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
