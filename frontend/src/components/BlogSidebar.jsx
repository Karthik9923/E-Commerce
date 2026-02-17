import React from "react";

const BlogSidebar = () => {
  const categories = [
    "All Topics",
    "IoT Solutions",
    "Industry 4.0",
    "Smart Agriculture",
    "AI Integration"
  ];

  const popularPosts = [
    {
      title: "5G's Impact on Industrial IoT",
      views: "2.5k views"
    },
    // Add more popular posts
  ];

  const tags = [
    "Robotics", "Automation", "Sensors", "Edge Computing", "Data Analytics"
  ];

  return (
    <div className="space-y-8">
      {/* Categories */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category}>
              <button className="text-gray-600 hover:text-blue-600 w-full text-left">
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Posts */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Popular Posts</h3>
        <ul className="space-y-4">
          {popularPosts.map((post, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">{index + 1}.</span>
              <div>
                <p className="font-medium hover:text-blue-600 cursor-pointer">
                  {post.title}
                </p>
                <p className="text-sm text-gray-500">{post.views}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Trending Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <button
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-blue-100 hover:text-blue-600"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;