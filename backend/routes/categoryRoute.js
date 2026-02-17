import express from 'express';
import Category from '../models/categoryModel.js'

const router = express.Router();

// Route to add a new category
// Modified add category route
// In your category route (backend)
router.post('/add', async (req, res) => {
  const { categoryName } = req.body;

  // Add validation for empty name
  if (!categoryName || !categoryName.trim()) {
    return res.status(400).json({ 
      success: false, 
      message: 'Category name cannot be empty' 
    });
  }

  try {
    const existingCategory = await Category.findOne({ 
      name: { $regex: new RegExp(`^${categoryName.trim()}$`, 'i') } 
    });

    if (existingCategory) {
      return res.status(400).json({ 
        success: false, 
        message: `Category "${categoryName}" already exists` 
      });
    }

    const newCategory = new Category({ 
      name: categoryName.trim() 
    });
    
    await newCategory.save();

    res.status(201).json({ 
      success: true, 
      message: 'Category added successfully',
      category: newCategory 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while adding category' 
    });
  }
});
router.get('/all', async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json({ success: true, categories });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error fetching categories' });
    }
  });

  // Route to remove a category
  router.delete('/remove/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }
  
      await Category.findByIdAndDelete(id); // Updated method to delete the category
      res.status(200).json({ success: true, message: 'Category removed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error removing category' });
    }
  });
  
  

export default router;
