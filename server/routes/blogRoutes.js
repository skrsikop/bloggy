// blogRoutes.js
import express from "express";
import {
  addBlog,
  addComment,
  deleteBlogById,
  getAllBlogs,
  getBlogComments,
  getBlogId,
  togglePublish,
  approveComment,
  deleteComment,
  generateContent,
} from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const blogRouter = express.Router();

blogRouter.post("/add", upload.single("image"), auth, addBlog);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogId);
blogRouter.post("/delete", auth, deleteBlogById); // Fixed: Added auth middleware
blogRouter.post("/toggle-publish", auth, togglePublish);
blogRouter.post("/add-comment", addComment);
blogRouter.post("/comments", getBlogComments);
blogRouter.post("/approve-comment", auth, approveComment); // New route
blogRouter.post("/delete-comment", auth, deleteComment); blogRouter.post("/generate", auth, generateContent);

export default blogRouter;