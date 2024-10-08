import express from "express";
import { createItem,getItemsByCategoryIdOrName,getAllItems,getItemsBySubCategoryIdOrName,getItemByIdOrName,updateItemByIdOrName,searchItemByName } from "../controller/itemController.js";

const itemRoute=express.Router();

itemRoute.post('/:categoryId/:subCategoryId',createItem);
itemRoute.get('/', getAllItems);
itemRoute.get('/category/:identifier', getItemsByCategoryIdOrName);
itemRoute.get('/subcategory/:identifier', getItemsBySubCategoryIdOrName);
itemRoute.get('/:identifier', getItemByIdOrName);
itemRoute.put('/:identifier',updateItemByIdOrName);
itemRoute.get('/search/:name', searchItemByName);

export default itemRoute;
