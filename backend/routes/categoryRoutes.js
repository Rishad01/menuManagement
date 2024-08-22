import express from 'express';
import { createCategory,getAllCategories,getCategory,updateCategory} from '../controller/categoryController.js';

// Creating the router instance
const categoryRoute = express.Router();

// Defining the route
categoryRoute.post('/', createCategory);
categoryRoute.get('/',getAllCategories);
categoryRoute.get('/:identifier',getCategory);
categoryRoute.put('/update/:identifier',updateCategory);

export default categoryRoute;