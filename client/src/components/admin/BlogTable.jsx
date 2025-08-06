import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const BlogTable = ({ blog, fetchBlog, index }) => {
  const { title, createdAt, isPublished } = blog;
  const blogDate = new Date(createdAt);

  const { axios } = useAppContext();

  const deleteBlog = async () => {
    const confirm = window.confirm("Are you sure you want to delete this blog?");
    if (!confirm) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to perform this action");
        return;
      }
      const { data } = await axios.post(
        "/api/blog/delete",
        { id: blog._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        await fetchBlog();
        toast.success(data.message);
      } else {
        toast.error(data.message || "Failed to delete blog");
      }
    } catch (error) {
      console.error("Delete Blog Error:", error.response || error);
      toast.error(
        error.response?.data?.message || error.message || "An error occurred while deleting the blog"
      );
    }
  };

  const togglePublish = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to perform this action");
        return;
      }
      const { data } = await axios.post(
        "/api/blog/toggle-publish",
        { id: blog._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        await fetchBlog();
        toast.success(data.message);
      } else {
        toast.error(data.message || "Failed to toggle publish status");
      }
    } catch (error) {
      console.error("Toggle Publish Error:", error.response || error);
      toast.error(
        error.response?.data?.message || error.message || "An error occurred while toggling publish status"
      );
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <th className="px-2 py-4">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{blogDate.toDateString()}</td>
      <td className="px-2 py-4 max-sm:hidden">
        <p className={`${isPublished ? "text-green-800" : "text-orange-700"}`}>
          {isPublished ? "Published" : "Unpublished"}
        </p>
      </td>
      <td className="px-2 py-4 flex text-xs gap-3">
        <button
          onClick={togglePublish}
          className="border px-2 py-0.5 mt-1 rounded cursor-pointer"
        >
          {isPublished ? "Unpublish" : "Publish"}
        </button>
        <img
          src={assets.cross_icon}
          alt="cross icon"
          onClick={deleteBlog}
          className="w-8 hover:scale-110 transition-all cursor-pointer"
        />
      </td>
    </tr>
  );
};

export default BlogTable;