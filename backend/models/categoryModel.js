import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Prevents duplicate category names
  },
});

const Category = mongoose.model('Category', categorySchema);
export default Category;
