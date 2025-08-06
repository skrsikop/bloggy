import React, { useEffect, useState } from "react";
import BlogTable from "../../components/admin/BlogTable";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ListBlog = () => {

  const [blogs, setBlogs] = useState([])
  const {axios} = useAppContext()


   const fetchBlogs = async () => {
      try {
        const {data} = await axios.get('/api/admin/blogs')
        if(data.success) {
          setBlogs(data.blogs)
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
  
    useEffect(() => {
      fetchBlogs()
    }, [])
  return <div className="flex-1 pt-5 px-5 sm:pt-12  sm:pl-16  bg-blue-50/50">

    <h1>All Blogs </h1>

    <div className=" relative h-4/5 mt-4 max-w-4xl scrollbar-hide bg-white  overflow-x-auto  shadow rounded-lg">
            <table className="w-full text-sm  text-gray-500">
              <thead className="text-xs text-gray-600  text-left uppercase">
                <tr>
                  <th scope="col" className="px-2 py-4">#</th>
                  <th scope="col" className="px-2 py-4">Blog Title</th>
                  <th scope="col" className="px-2 py-4 max-sm:hidden ">Date</th>
                  <th scope="col" className="px-2 py-4 max-sm:hidden ">Status</th>
                  <th scope="col" className="px-2 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog,index) => {
                  return <BlogTable 
                    key={blog.id}
                    blog={blog}
                    fetchBlog={fetchBlogs}
                    index={index + 1}
                  />
                })}
              </tbody>
            </table>
        </div>
  </div>;
};

export default ListBlog;
