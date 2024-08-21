import express from "express";
import { createSubCategory,getAllsubCategories,getSubCategoryByNameOrId,getSubCategoriesByCategoryIdentifier,updatesubCategory } from "../controller/subcategoryController.js";

const subcategoryRoute=express.Router();

subcategoryRoute.post('/:categoryId',createSubCategory);
subcategoryRoute.get('/',getAllsubCategories);
subcategoryRoute.get('/:identifier',getSubCategoryByNameOrId);
subcategoryRoute.get('/getBycategory/:identifier',getSubCategoriesByCategoryIdentifier);
subcategoryRoute.put('/:identifier',updatesubCategory);

export default subcategoryRoute;