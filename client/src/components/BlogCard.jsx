import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({blog}) => {
  const {title, description, category, image, _id} = blog;
  const naviagte = useNavigate()
  return (
    <div onClick={() => naviagte(`/blog/${_id}`)} className="w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/25 cursor-pointer  transition-all duration-300">
      <img src={image} alt="blog image" className='aspect-video' />
      <span className="ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 text-primary text-xs  rounded-full">{category}</span>

      <div className="p-5">
        <h5 className="mb-2 font-medium text-gray-5900 ">{title}</h5>
        <p className="mb-3 text-xs text-gray-600" dangerouslySetInnerHTML={{__html: description.slice(0,80)}}></p>
      </div>
    </div>
  );
};

export default BlogCard;
