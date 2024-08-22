import Category from "../model/category.js";
import SubCategory from "../model/subcategory.js";
import mongoose from "mongoose";

export const createSubCategory = async (req, res) => {
    try {
      const { categoryId } = req.params;
      console.log(categoryId);
      const { name, image, description, tax } = req.body;
  
      // Ensure the category exists
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      // Create a new sub-category
      const subCategory = new SubCategory({
        name,
        image,
        description,
        taxApplicable: category.taxApplicability,
        tax: category.taxApplicability ? tax : category.tax,
        categoryId: category._id // Reference to the parent category
      });
  
      await subCategory.save();
  
      res.status(201).json(subCategory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const getAllsubCategories = async (req, res) => {
    try {
      const subcategories = await SubCategory.find({});
      res.status(200).json(subcategories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

export const getSubCategoriesByCategoryIdentifier = async (req, res) => {
  try {
    const { identifier } = req.params;

    // Determine whether the identifier is an ID or a name
    let category;
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      // If identifier is a valid ObjectId, find by ID
      category = await Category.findById(identifier);
    } else {
      // Otherwise, find by name
      category = await Category.findOne({ name: identifier });
    }

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Find all sub-categories under the specified category
    const subCategories = await SubCategory.find({ categoryId: category._id });

    if (subCategories.length === 0) {
      return res.status(404).json({ error: 'No sub-categories found for this category' });
    }

    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


  export const getSubCategoryByNameOrId = async (req, res) => {
    try {
      const { identifier } = req.params;
      console.log(identifier);
      // Determine whether the identifier is an ID or a name
      const query = mongoose.Types.ObjectId.isValid(identifier)
        ? { _id: identifier }
        : { name: identifier };
  
      // Find the sub-category by ID or name
      const subCategory = await SubCategory.findOne(query).populate('categoryId');
  
      if (!subCategory) {
        return res.status(404).json({ error: 'Sub-category not found' });
      }
  
      res.status(200).json(subCategory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const updatesubCategory = async (req, res) => {
    try {
        const { identifier } = req.params;
        //console.log(identifier);
        // Determine whether the identifier is an ID or a name
        const query = mongoose.Types.ObjectId.isValid(identifier)
          ? { _id: identifier }
          : { name: identifier };
      const updates = req.body;
  
      // Find and update the category by name
      const subcategory = await SubCategory.findOneAndUpdate( query , updates, {
        new: true, // Return the updated document
      });
  
      if (!subcategory) {
        return res.status(404).json({ error: 'Sub Category not found' });
      }
  
      res.status(200).json(subcategory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };