import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../AuthProvider";

const Layout = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/upload">Upload</Link>
            <Link onClick={logout}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
