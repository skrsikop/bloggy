import React from "react";
import { assets } from "../../assets/assets";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Layout = () => {
  const { setToken, axios, navigate } = useAppContext();

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    toast.success("Logged out successfully");
    navigate("/admin"); // Redirect to login instead of home
  };

  return (
    <>
      <div className="flex justify-between items-center py-2 border-b border-gray-200 h-[70px] px-4 sm:px-12">
        <img
          src={assets.logo}
          alt="logo"
          className="cursor-pointer w-32 sm:w-40"
          onClick={() => navigate("/")}
        />
        <button
          onClick={logout}
          className="bg-primary text-white px-8 py-2 rounded-full transition-all cursor-pointer hover:bg-primary/80"
        >
          Logout
        </button>
      </div>
      <div className="flex h-[calc(100vh-70px)]">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;