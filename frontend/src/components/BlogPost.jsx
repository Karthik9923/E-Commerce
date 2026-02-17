import React from "react";
import { Link } from "react-router-dom";

const BlogPost = ({ post }) => {
  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
      <img 
        src={post.image} 
        alt={post.title} 
        className="w-full h-48 object-cover rounded-t-xl"
      />
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span>{new Date(post.date).toLocaleDateString()}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          <Link to={`/blogs/${post._id}`} className="hover:text-blue-600">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
            {post.category}
          </span>
          {post.tags.map(tag => (
            <span 
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
