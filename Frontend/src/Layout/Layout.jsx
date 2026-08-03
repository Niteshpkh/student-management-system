import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;