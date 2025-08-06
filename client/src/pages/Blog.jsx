import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, blog_data, comments_data } from "../assets/assets";
import Moment from "moment";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Blog = () => {
  const {id} = useParams()
  const {axios} = useAppContext();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const fetchBlogData = async () => {
    try {
      const {data} = await axios.get(`/api/blog/${id}`)
      data.success ? setData(data.blog) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchComments = async () => {
    try {
      const {data} = await axios.post('/api/blog/comments', {blogId: id})
      if(data.success) {
        setComments(data.comments)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchBlogData()
    fetchComments()
  } , [])

 const addComment = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post('/api/blog/add-comment', { name, content, blog: id }); // Change blogId to blog
    if (data.success) {
      toast.success(data.message);
      setName('');
      setContent('');
      fetchComments(); // Refresh comments after adding a new one
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};
  
  return data ?  (
    <div className=" relative">
      <Navbar />
      <img src={assets.gradientBackground} alt="background" className="absolute -top-50 -z-1 opacity-50" />

      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary p-4 font-medium ">Puplished on {Moment(data.createdAt).format('MMM Do YYYY')}</p>
        <h1 className="text-2xl sm:text-5xl font-semibold text-gray-800  max-w-2xl  mx-auto">{data.title}</h1>
        <h2 className="my-5 max-w-lg  truncate mx-auto">{data.subTitle}</h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border border-primary/35 bg-primary/5 font-medium  text-sm text-primary">Michale Brown</p>
      </div>
      <div className="mx-5 max-w-5xl md:mx-auto  my-10 mt-6 ">
        <img src={data.image} alt={data.title} className="mb-5  rounded-3xl" />

        <div dangerouslySetInnerHTML={{__html: data.description}} className="rich-text max-w-3xl mx-auto"></div>

        {/* comments section  */}
        <div className="mt-14 mb-10 max-w-3xl  mx-auto">
          <p className="font-semibold mb-4">Comments {comments.length}</p>
          <div className="flex flex-col gap-4">
            {comments.map((comment, index) => (
              <div className="bg-primary/2 relative border border-primary/5 max-w-xl p-4  rounded text-gray-600" key={index}>
                  <div className="flex items-center gap-2 mb-2 ">
                    <img src={assets.user_icon} alt="user icon" className="w-6" />
                    <p className="font-medium">{comment.name}</p>
                  </div>
                  <p className="text-sm max-w-md  ml-8">{comment.content}</p>
                  <div className="absolute right-4 gap-2 text-xs  bottom-3 flex items-center">{Moment(comment.createdAt).fromNow()}</div>
              </div>
            ))}
          </div>
        </div>
          
          {/* add comment section  */}
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Add Your Comment</p>
          <form className=" flex flex-col max-w-lg  items-start gap-4" onSubmit={addComment}>

            <input onChange={(e) => setName(e.target.value) } value={name} type="text" placeholder="Name" required className="w-full p-2 border border-gray-300 rounded outline-none" />
            <textarea onChange={(e)=> setContent(e.target.value)} value={content} placeholder="Comment" required className="w-full p-2 border border-gray-300 rounded h-48 outline-none"></textarea>
            <button type="submit" className="bg-primary text-white px-8 py-2 rounded hover:scale-105 transition-all  cursor-pointer">Submit Comment</button>
          </form>
        </div>
          
          {/* share buttons  */}
        <div className="my-24 max-w-3xl mx-auto ">
          <p className="font-semibold my-4">Share this article on social media</p>
          <div className="flex">
            <img src={assets.facebook_icon} alt="facebook icon " className="cursor-pointer" width={50} />
            <img src={assets.twitter_icon} alt="twitter icon " className="cursor-pointer" width={50} />
            <img src={assets.googleplus_icon} alt="linkedIn icon " className="cursor-pointer" width={50} />
          </div>
        </div>

      </div>
      <Footer />
    </div>
  ) : (
    <Loader />
  );
};

export default Blog;
