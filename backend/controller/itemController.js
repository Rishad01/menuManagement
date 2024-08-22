import Item from '../model/item.js';
import Category from '../model/category.js';
import SubCategory from '../model/subcategory.js';
import mongoose from 'mongoose';
export const createItem = async (req, res) => {
  try {
    const { categoryId, subCategoryId } = req.params;
    const { name, image, description,tax,baseAmount, discount } = req.body;
    console.log(req.body);
    // Ensure that either categoryId or subCategoryId is provided
    if (!categoryId && !subCategoryId) {
      return res.status(400).json({ error: 'Either categoryId or subCategoryId must be provided.' });
    }

    // Validate if categoryId is provided
    if (categoryId) {
      var category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ error: 'Category not found.' });
      }
    }

    // Validate if subCategoryId is provided
    if (subCategoryId) {
      const subCategory = await SubCategory.findById(subCategoryId);
      if (!subCategory) {
        return res.status(404).json({ error: 'SubCategory not found.' });
      }
    }

    // Calculate the total amount
    const totalAmount = baseAmount - (discount || 0);

    // Create a new item
    const newItem = new Item({
      name,
      image,
      description,
      taxApplicable: category.taxApplicability,
        tax: category.taxApplicability ? tax : category.tax,
      baseAmount,
      discount,
      totalAmount,
      categoryId: categoryId || null,
      subCategoryId: subCategoryId || null
    });

    // Save the item to the database
    await newItem.save();

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getItemsByCategoryIdOrName = async (req, res) => {
    try {
      const { identifier } = req.params;
  
      let category;
  
      // Check if the parameter is a valid ObjectId (i.e., categoryId)
      if (mongoose.Types.ObjectId.isValid(identifier)) {
        // Find the category by ID
        category = await Category.findById(identifier);
      } else {
        // Otherwise, find the category by name
        category = await Category.findOne({ name: identifier });
      }
  
      // If no category is found, return a 404 error
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      // Find all items associated with the found category ID
      const items = await Item.find({ categoryId: category._id });
  
      if (items.length === 0) {
        return res.status(404).json({ error: 'No items found for this category' });
      }
  
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const getAllItems = async (req, res) => {
    try {
      // Fetch all items from the database
      const items = await Item.find();
  
      if (items.length === 0) {
        return res.status(404).json({ error: 'No items found' });
      }
  
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const getItemsBySubCategoryIdOrName = async (req, res) => {
    try {
      const { identifier } = req.params;
  
      let subCategory;
  
      // Check if the parameter is a valid ObjectId (i.e., subCategoryId)
      if (mongoose.Types.ObjectId.isValid(identifier)) {
        // Find the sub-category by ID
        subCategory = await SubCategory.findById(identifier);
      } else {
        // Otherwise, find the sub-category by name
        subCategory = await SubCategory.findOne({ name: identifier });
      }
  
      // If no sub-category is found, return a 404 error
      if (!subCategory) {
        return res.status(404).json({ error: 'Sub-category not found' });
      }
  
      // Find all items associated with the found sub-category ID
      const items = await Item.find({ subCategoryId: subCategory._id });
  
      if (items.length === 0) {
        return res.status(404).json({ error: 'No items found for this sub-category' });
      }
  
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const getItemByIdOrName = async (req, res) => {
    try {
      const { identifier } = req.params;
  
      let item;
  
      // Check if the parameter is a valid ObjectId (i.e., item ID)
      if (mongoose.Types.ObjectId.isValid(identifier)) {
        // Find the item by ID
        item = await Item.findById(identifier);
      } else {
        // Otherwise, find the item by name
        item = await Item.findOne({ name: identifier });
      }
  
      // If no item is found, return a 404 error
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const updateItemByIdOrName = async (req, res) => {
    try {
      const { identifier } = req.params; // Extract item ID or name from the request parameters
      const updateData = req.body; // Extract the update data from the request body
  
      let item;
  
      // Check if the parameter is a valid ObjectId (i.e., item ID)
      if (mongoose.Types.ObjectId.isValid(identifier)) {
        // Find the item by ID first to get the existing values
        item = await Item.findById(identifier);
  
      } else {
        // Otherwise, find the item by name
        item = await Item.findOne({ name: identifier });
      }
  
      // If no item is found, return a 404 error
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      // If baseAmount or discount is not provided, use the existing values from the database
      const baseAmount = updateData.baseAmount !== undefined ? updateData.baseAmount : item.baseAmount;
      const discount = updateData.discount !== undefined ? updateData.discount : item.discount;
  
      // Calculate the new totalAmount
      updateData.totalAmount = baseAmount - discount;
  
      // Update the item fields with the new data
      Object.assign(item, updateData);
  
      // Save the updated item
      await item.save();
  
      res.status(200).json(item); // Send the updated item as the response
    } catch (error) {
      res.status(500).json({ error: error.message }); // Handle any errors
    }
  };

export const searchItemByName = async (req, res) => {
  try {
    const { name } = req.params;

    // Search for the item by name (case-insensitive)
    const item = await Item.findOne({ name: { $regex: new RegExp(name, 'i') } });

    // If no item is found, return a 404 error
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
