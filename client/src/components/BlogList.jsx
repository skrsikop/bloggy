import React, { useState } from "react";
import {  blogCategories } from "../assets/assets";
import { motion } from "motion/react"
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

const BlogList = () => {

  const [menu, setMenu] = useState("All")
  const {blog, input} = useAppContext();

const filteredBlogs = () => {
  if (input === "") {
    return blog; 
  }
  return blog.filter((blog) =>
    blog.title.toLowerCase().includes(input.toLowerCase()) ||
    blog.category.toLowerCase().includes(input.toLowerCase())
  );
};
  return (
    <div>
      <div className="flex justify-center gap-4 relative my-10 sm:gap-8">
         {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button onClick={() => setMenu(item)} className={`cursor-pointer  text-gray-500 ${menu === item && "text-white p-4 pt-0.5"} `}>
              {item}
              {menu === item && <motion.div layoutId="underline"
              transition={{type: 'spring', stiffness: 500, damping: 30}}
              className="absolute left-0 right-0  top-0 h-7 bg-primary rounded-full  -z-1" ></motion.div>}
            </button>
          </div>
         ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {filteredBlogs().filter((blog) => menu === "All" ? true : blog.category === menu).map((blog) => <BlogCard
          key={blog._id}
          blog={blog}
        />)}
      </div>
    </div>
  );
};

export default BlogList;
