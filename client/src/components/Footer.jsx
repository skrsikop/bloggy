import React from "react";
import { assets, footer_data } from "../assets/assets";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3">  
      <div className=" flex flex-col md:flex-row  items-start
       justify-between  py-10 border-b border-gray-500/30 text-gray-500  gap-10">
        <div>
          <img src={assets.logo} alt="logo" className="w-32 sm:w-44" />
          <p className="max-w-[410px] mt-6 ">
            QuickBlog is a blog website where you can find a wide range of
            insightful and thought-provoking stories that spark your curiosity,
          </p>
        </div>
        <div className="flex flex-wrap justify-between w-full md:w-[45%]  gap-5 ">
          {footer_data.map((footer,index) => (
            <div key={index}>
              <h3 className="font-semibold mb-2  text-base text-gray-900  md:mb-5 ">{footer.title}</h3>
              <ul className="text-sm  space-y-1 ">
                {footer.links.map((link, index) => (
                  <li key={index}>
                    <a className=" hover:underline transition" href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">Copyright 2025 &copy; QuickBlog | skrsikop. All rights reserved</p>
    </div>
  );
};

export default Footer;
