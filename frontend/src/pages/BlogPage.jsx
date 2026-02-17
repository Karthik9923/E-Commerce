import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import BlogPost from "../components/BlogPost";
import BlogSidebar from "../components/BlogSidebar";

const BlogPage = () => {
  const { type } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { backendUrl} = useContext(ShopContext);

  // Fetch posts from the backend API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get( backendUrl + "/api/blogs"); // adjust the URL as needed
        if (response.data.success) {
          setPosts(response.data.posts);
        } else {
          setError("Failed to load posts.");
        }
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || "Network error.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-600">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-gray-200 rounded">
          Try Again
        </button>
      </div>
    );
  }

  // Optionally filter posts based on "type" parameter (e.g., category)
  const filteredPosts = type && type !== "all" 
    ? posts.filter(post => post.category.toLowerCase() === type.toLowerCase()) 
    : posts;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 capitalize">
              {type || "All"} Posts
            </h1>
            
            <div className="grid gap-8">
              {filteredPosts.map(post => (
                <BlogPost key={post._id} post={post} />
              ))}
            </div>

            {/* Pagination (dummy for now) */}
            <div className="mt-12 flex justify-between items-center">
              <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                ← Previous
              </button>
              <span className="text-gray-600">Page 1 of 5</span>
              <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                Next →
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
