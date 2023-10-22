/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <div>
      <React.Fragment>
        <Navbar />
        <div className="columns mt-6" style={{ minHeight: "100vh" }}>
          <div className="column is-2">
            <Sidebar />
          </div>
          <div className="column has-background-light">
            <main>{children}</main>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
};

export default Layout;
