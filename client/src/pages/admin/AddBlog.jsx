import React, { useEffect, useRef, useState } from "react";
import {assets, blogCategories} from "../../assets/assets";
import Quill from "quill";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import {parse} from 'marked';

const AddBlog = () => {

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const {axios} = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('');
  const [IsPublished, setIsPublished] = useState(false);
  
  const onSubmitHandler = async (e) => {
  e.preventDefault();
  try {
    setIsAdding(true);

    const blog = {
      title,
      subTitle,
      category: category || 'Startup', // Fallback to 'Startup' haddii category madhan tahay
      isPublished: IsPublished, // U dhigma magaca goobta backend-ka (camelCase)
      description: quillRef.current?.root.innerHTML || '',
    };

    const formData = new FormData();
    formData.append('blog', JSON.stringify(blog));
    if (image) {
      formData.append('image', image);
    }

    const { data } = await axios.post('/api/blog/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (data.success) {
      toast.success(data.message);
      setTitle('');
      setSubTitle('');
      setCategory('Startup');
      setImage(null);
      setIsPublished(false);
      if (quillRef.current) {
        quillRef.current.root.innerHTML = '';
      }
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  } finally {
    setIsAdding(false);
  }
};
  
  const generateContent = async () => {
    if(!title) return toast.error('Please enter blog title');
    try {
      setLoading(true);
      const {data} = await axios.post('/api/blog/generate', {prompt: title});
      if(data.success) {
        quillRef.current.root.innerHTML = parse(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>  {
    if(!quillRef.current && editorRef.current){
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow'
      })
    }
  }, [])
  
  return (
    <form onSubmit={onSubmitHandler} className="flex-1 bg-blue-50/50 text-gray-600 overflow-scroll h-full">
      <div className="bg-white w-full max-w-3xl  p-4 md:p-10  sm:m-10 shadow rounded">
        <p>Upload Thumnail</p>
        <label htmlFor="image">
          <img src={!image ?  assets.upload_area :  URL.createObjectURL(image)} className="cursor-pointer  mt-2 h-16  rounded " alt="upload image" />
          <input onChange={(e) => setImage(e.target.files[0]) } type="file"id="image" hidden required />
        </label>

        <p className="mt-4">Blog Title</p>
        <input type="text" placeholder="Enter Blog Title" required className="w-full max-w-lg mt-2 p-2 border border-gray-300  outline-none rounded" onChange={(e) => setTitle(e.target.value)} value={title} />

        <p className="mt-4">Sub title</p>
        <input type="text" placeholder="Enter Sub title" required className="w-full max-w-lg mt-2 p-2 border border-gray-300  outline-none rounded" onChange={(e) => setSubTitle(e.target.value)} value={subTitle} />

        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg h-74  pb-16 sm:pb-10 pt-2  relative">
          <div ref={editorRef}> </div>
          {loading && (
            <div className='absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center  bg-black/10 mt-2 '>
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-t-white">
                
              </div>
            </div>
          )}
          <button disabled={loading} type="submit" className=" absolute bottom-1 right-2 ml-2 text-xs text-white rounded hover:underline cursor-pointer  bg-black/70  px-4  py-1.5" onClick={generateContent}>Generate with AI</button>
        </div>

        <p className="mt-4">Blog Category</p>
        <select onChange={(e) => setCategory(e.target.value)} value={category} name="category" className="mt-2 px-3 border border-gray-300 outline-none rounded  py-2 text-gray-500" >
          <option value="0">Select Category</option>
          {blogCategories.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>

        <div className="flex gap-2 mt-4">
          <p>Publish Now</p>
          <input type="checkbox" checked={IsPublished} onChange={(e) => setIsPublished(e.target.checked)} className="cursor-pointer  scale-105" />
        </div>

        <button disabled={isAdding} type="submit" className="mt-4 px-8 py-3 text-white bg-primary hover:bg-primary/80 transition-all rounded-md cursor-pointer">{isAdding ? 'Adding...' : 'Add Blog'}</button>
      </div>
    </form>
  );
};

export default AddBlog;
