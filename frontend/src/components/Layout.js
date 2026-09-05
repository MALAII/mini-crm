import React from "react";
import Sidebar from "./Sidebar";

// Wraps every authenticated page with the sidebar and a main content area
const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
