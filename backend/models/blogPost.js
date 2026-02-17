import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  excerpt: { 
    type: String, 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  readTime: { 
    type: String 
  },
  category: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String 
  },
  tags: [{ 
    type: String 
  }]
});

export default mongoose.model("BlogPost", blogPostSchema);
