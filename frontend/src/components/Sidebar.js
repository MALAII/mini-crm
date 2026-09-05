import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const closeMenu = () => setOpen(false);

  return (
    <>
      {/* Hamburger button, only visible on small screens */}
      <button
        className="sidebar-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        &#9776;
      </button>

      {/* Overlay to close the sidebar when tapping outside it on mobile */}
      {open && <div className="sidebar-overlay" onClick={closeMenu}></div>}

      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <span className="sidebar-logo">CRM</span>
          <span className="sidebar-title">Mini CRM</span>
        </div>

        {user && (
          <div className="sidebar-user">
            Signed in as <strong>{user.name}</strong>
          </div>
        )}

        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className="sidebar-link" onClick={closeMenu}>
            Dashboard
          </NavLink>
          <NavLink to="/leads" className="sidebar-link" onClick={closeMenu}>
            Leads
          </NavLink>
          <NavLink to="/customers" className="sidebar-link" onClick={closeMenu}>
            Customers
          </NavLink>
        </nav>

        <button className="sidebar-logout" onClick={handleLogout}>
          Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
