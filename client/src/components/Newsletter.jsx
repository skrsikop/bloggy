import React from "react";

const Newsletter = () => {
  return (
    <div className="flex flex-col items-center my-32 justify-center text-center space-y-2">
      <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a blog!</h1>
      <p className="md:text-lg text-gray-500/70  pb-8">
        Subscribe to our newsletter and get the latest stories delivered to your
        inbox.
      </p>
      <form className="flex items-center justify-between  h-12  max-w-2xl  w-full md:h-13">  
        <input className="border border-gray-300  outline-none w-full h-full rounded-r-none px-3  text-gray-500 " type="text" placeholder="Enter your email" required />
        <button type="submit" className="md:px-12 hover:bg-primary  transition-all  cursor-pointer rounded-md h-full  rounded-l-none  text-white bg-primary/80">Subscribe</button>
      </form>
    </div>
  );
};

export default Newsletter;
