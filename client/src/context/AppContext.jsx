import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [blog, setBlog] = useState([]);
  const [input, setInput] = useState("");

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");
      if (data.success) {
        setBlog(data.blogs);
      } else {
        toast.error(data.message || "Failed to fetch blogs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch blogs");
      console.error("Fetch Blogs Error:", error.response || error);
    }
  };

  const validateToken = async () => {
    if (!token) return;
    try {
      await axios.get("/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      if (error.response?.status === 401) {
        setToken(null);
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        toast.error("Session expired. Please log in again.");
        navigate("/admin");
      }
    }
  };

  useEffect(() => {
    fetchBlogs();
    validateToken();
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token, navigate]);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post("/api/admin/login", { email, password });
      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        toast.success("Login successful");
        navigate("/admin");
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Invalid credentials";
      toast.error(errorMessage === "Invalid Credentials" ? "Invalid credentials" : errorMessage);
      console.error("Login Error:", error.response || error);
    }
  };

  const logout = () => {
    setToken(null);
    setBlog([]);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    toast.success("Logged out successfully");
    navigate("/admin"); // Redirect to login instead of home
  };

  const value = {
    axios,
    token,
    setToken,
    blog,
    setBlog,
    input,
    setInput,
    navigate,
    login,
    logout,
    fetchBlogs,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};