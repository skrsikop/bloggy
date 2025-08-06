import React, { useRef } from "react";
import {assets} from '../assets/assets'
import { useAppContext } from "../context/AppContext";

const Header = () => {

  const {setInput, input} = useAppContext();
  const inputRef = useRef();

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setInput(inputRef.current.value)
  }

  const onClear = () => {
    setInput('');
    inputRef.current.value = '';
  };
  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative ">
      <div className="text-center mt-20 mb-8">
        <div className="inline-flex items-center justify-center gap-4  px-6 py-1.5  mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary">
          <p>Read Any Type Of blog</p>
          <img src={assets.star_icon} alt="star icon" className="w-2.5" />
        </div>

        <h1 className="text-3xl sm:text-6xl  font-semibold  sm:leading-16  text-gray-700">
          Discover <span className="text-primary">Stories</span> Worth <br />Sharing.
        </h1>
        <p className="my-6 sm:my-8 max-w-2xl m-auto text-gray-500 max-sm:text-xs">
          Dive into handpicked stories and insightful articles that spark your curiosity, fuel your passion, and offer meaningful perspectives you’ll want to share again and again.
        </p>

        <form onSubmit={onSubmitHandler} className="flex justify-between max-w-lg max-sm:scale-75 border border-gray-300 bg-white rounded overflow-hidden  mx-auto">
          <input ref={inputRef} className="w-full pl-4 outline-none" type="text" placeholder="Search for blogs" required />
          <button className="bg-primary text-white px-8 py-2 rounded hover:scale-105 transition-all  cursor-pointer ml-1.5" type="submit">Search</button>
        </form>
      </div>

      <div className="text-center ">
        {
          input &&
          <button onClick={onClear} className="border font-light shadow-custom-sm py-1 px-3 text-xs rounded-sm cursor-pointer ">Clear Search</button>
        }
      </div>
      <img src={assets.gradientBackground} alt="background" className="absolute -top-50 -z-1 opacity-50" />
    </div>
  );
};

export default Header;
