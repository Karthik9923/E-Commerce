import express from "express";
import adminAuth from '../middleware/adminAuth.js'
import { 
  getBlogPosts, 
  getBlogPostById, 
  createBlogPost, 
  updateBlogPost, 
  deleteBlogPost 
} from "../controllers/blogController.js";
import upload from '..//middleware/multer.js'

const router = express.Router();

// Public routes
router.get("/", getBlogPosts);
router.get("/:id", getBlogPostById);

// Protected routes (if needed, you can add authentication middleware)
router.post("/", upload.fields([{ name: "image", maxCount: 1 }]), adminAuth, createBlogPost);
router.put("/:id", adminAuth, updateBlogPost);
router.delete("/:id", adminAuth, deleteBlogPost);

export default router;
