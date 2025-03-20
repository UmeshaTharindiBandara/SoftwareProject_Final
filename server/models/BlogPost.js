import mongoose from 'mongoose';

// Define the BlogPost schema
const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },

});

// Create and export the BlogPost model
const BlogPost = mongoose.model('BlogPost', blogPostSchema);
export default BlogPost;