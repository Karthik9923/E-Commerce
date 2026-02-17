import BlogPost from '../models/blogPost.js'
import { v2 as cloudinary } from "cloudinary";

// Get all blog posts (with optional query for pagination or filtering)
export const getBlogPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ date: -1 });
    res.json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a single blog post by ID
export const getBlogPostById = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    res.json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create a new blog post with Cloudinary image upload
export const createBlogPost = async (req, res) => {
  try {
    const { title, excerpt, content, readTime, category, tags } = req.body;
    let imageUrl = "";

    // If an image file is provided, upload it to Cloudinary
    if (req.files && req.files.image) {
      const imageFile = req.files.image[0]; // Assume a single image file
      const result = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
      imageUrl = result.secure_url;
    }

    const newPost = new BlogPost({
      title,
      excerpt,
      content,
      readTime,
      category,
      image: imageUrl,
      tags,
      date: new Date() // Explicitly setting the date
    });

    await newPost.save();
    res.status(201).json({ success: true, post: newPost });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Update an existing blog post (with Cloudinary image upload if provided)
export const updateBlogPost = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // If a new image is provided, upload and replace the image URL
    if (req.files && req.files.image) {
      const imageFile = req.files.image[0];
      const result = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
      updateData.image = result.secure_url;
    }

    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    res.json({ success: true, post: updatedPost });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a blog post
export const deleteBlogPost = async (req, res) => {
  try {
    const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    res.json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
