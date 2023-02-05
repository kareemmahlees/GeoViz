import React from "react";
import { Sidebar, Header, BootChat } from "../Components";
import { Outlet } from "react-router-dom";
import "./Layout.scss";

const Layout = () => {
  return (
    <div className="main__layout">
      {/* <Header /> */}
      <div className="layout__content">
        <Sidebar />
        <div className="main__content">
          <Outlet />
        </div>
      </div>
      <BootChat />
    </div>
  );
};

export default Layout;
