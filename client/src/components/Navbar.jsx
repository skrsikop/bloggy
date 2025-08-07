import React from "react";
import { assets } from '../assets/assets';
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { navigate, token, axios } = useAppContext();

  const handleNavigation = async () => {
    if (!token) {
      navigate('/admin'); // Redirect to login if no token
      return;
    }

    try {
      // Test if token is valid by making a request to a protected route
      await axios.get('/api/admin/dashboard');
      navigate('/admin'); // Redirect to dashboard if token is valid
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token"); // Clear invalid token
        navigate('/login'); // Redirect to login on 401 error
      } else {
        console.error("Navigation error:", error.response || error);
      }
    }
  };

  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="logo"
        className="w-32 sm:w-44 cursor-pointer"
      />
      <button
        onClick={handleNavigation}
        className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5"
      >
        {token ? 'Dashboard' : 'Admin Login'}
        <img src={assets.arrow} alt="arrow" className="w-3" />
      </button>
    </div>
  );
};

export default Navbar;