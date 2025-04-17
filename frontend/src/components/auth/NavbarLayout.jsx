import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const NavbarLayout = () => {
  return (
    <div>
      {/* Navbar is rendered!*/}
      <Navbar />
      {/* Render child routes(routes inside <Routes>...</Routes>) */}
      <Outlet />
    </div>
  );
};

export default NavbarLayout;
