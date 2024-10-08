import express from "express";
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import categoryRoute from './routes/categoryRoutes.js';
import subcategoryRoute from "./routes/subcategoryRoutes.js";
import itemRoute from "./routes/itemRoutes.js";

dotenv.config();
const app=express();
// Middleware to parse JSON
app.use(express.json());

// Middleware to parse urlencoded data
app.use(express.urlencoded({ extended: true }));
connectDB();

app.get('/', (req, res) => {
    res.send('Welcome to the Menu Management API');
  });
app.use('/api/categories', categoryRoute);
app.use('/api/subcategories',subcategoryRoute);
app.use('/api/items',itemRoute);
app.listen(5000, () => console.log(`Server running on port 5000`));
