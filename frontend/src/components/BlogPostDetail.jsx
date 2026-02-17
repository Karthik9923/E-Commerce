import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import image1 from "../assets/Carousel/1.png"; // fallback image

const BlogPostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { backendUrl } = useContext(ShopContext);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(backendUrl + `/api/blogs/${id}`);
        if (response.data.success) {
          setPost(response.data.post);
        } else {
          setError("Failed to load post.");
        }
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || "Network error.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article className="prose lg:prose-xl">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-500">
            <div className="flex items-center gap-2">
              <span>{post.author}</span>
              <span>•</span>
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <span>{post.readTime}</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
              {post.category}
            </span>
          </div>
        </header>

        <img
          src={post.image || image1}
          alt={post.title}
          className="w-full h-96 object-cover rounded-xl mb-12"
        />

        <div dangerouslySetInnerHTML={{ __html: post.content }} />

        <footer className="mt-12 border-t pt-8">
          <div className="flex justify-between items-center">
            <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
              ← Previous Post
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
              Next Post →
            </button>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default BlogPostDetail;
