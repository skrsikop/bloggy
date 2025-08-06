import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import BlogTable from "../../components/admin/BlogTable";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const { axios, token, navigate, logout } = useAppContext();

  const fetchDashboard = async () => {
    try {
      if (!token) {
        toast.error("Please log in to access the dashboard");
        navigate("/login"); // Redirect to login if no token
        return;
      }
      const { data } = await axios.get("/api/admin/dashboard");
      if (data.success) {
        setDashboardData(data.dashboardData || { blogs: 0, comments: 0, drafts: 0, recentBlogs: [] });
      } else {
        toast.error(data.message || "Failed to fetch dashboard data");
      }
    } catch (error) {
      console.error("Fetch Dashboard Error:", error.response || error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        logout(); // Call logout to clear token and redirect to login
      } else {
        toast.error(error.response?.data?.message || "An error occurred while fetching dashboard data");
      }
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [token, navigate, logout]);

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-4 bg-white shadow cursor-pointer hover:scale-105 p-4 min-w-58 rounded transition-all">
          <img src={assets.dashboard_icon_1} alt="dashboard icon" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashboardData.blogs || 0}</p>
            <p className="text-gray-400 font-light">Blogs</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white shadow cursor-pointer hover:scale-105 p-4 min-w-58 rounded transition-all">
          <img src={assets.dashboard_icon_2} alt="dashboard icon" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashboardData.comments || 0}</p>
            <p className="text-gray-400 font-light">Comments</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white shadow cursor-pointer hover:scale-105 p-4 min-w-58 rounded transition-all">
          <img src={assets.dashboard_icon_3} alt="dashboard icon" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashboardData.drafts || 0}</p>
            <p className="text-gray-400 font-light">Drafts</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
          <img src={assets.dashboard_icon_4} alt="dashboard icon" />
          <p>Latest Blogs</p>
        </div>

        <div className="relative max-w-4xl scrollbar-hide bg-white overflow-x-auto shadow rounded-lg">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-600 text-left uppercase">
              <tr>
                <th scope="col" className="px-2 py-4">#</th>
                <th scope="col" className="px-2 py-4">Blog Title</th>
                <th scope="col" className="px-2 py-4 max-sm-hidden">Date</th>
                <th scope="col" className="px-2 py-4 max-sm-hidden">Status</th>
                <th scope="col" className="px-2 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs && dashboardData.recentBlogs.length > 0 ? (
                dashboardData.recentBlogs.map((blog, index) => (
                  <BlogTable
                    key={blog._id}
                    blog={blog}
                    fetchBlog={fetchDashboard}
                    index={index + 1}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-2 py-4 text-center">
                    No blogs available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;