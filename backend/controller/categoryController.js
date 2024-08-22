import Category from "../model/category.js";
import mongoose from "mongoose";
export const createCategory = async (req, res) => {
    try {
      const category = new Category(req.body);
      await category.save();
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const getAllCategories = async (req, res) => {
    try {
      const categories = await Category.find({});
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get category by name or ID
  export const getCategory = async (req, res) => {
    try {
      const { name } = req.params;
      let category;
  
      
      if (name) {
        category = await Category.findOne({ name: name });
      }
  
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //update category throgh name or ID
  export const updateCategory = async (req, res) => {
    try {
      const { identifier } = req.params;
        console.log(req.params);
        // Determine whether the identifier is an ID or a name
        const query = mongoose.Types.ObjectId.isValid(identifier)
          ? { _id: identifier }
          : { name: identifier };
      const updates = req.body;
  
      // Find and update the category by name
      const category = await Category.findOneAndUpdate( query , updates, {
        new: true, // Return the updated document
      });
  
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };