import mongoose from "mongoose";
//category model
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique:true },
  image: { type: String },
  description: { type: String },
  taxApplicability: { type: Boolean, default: false },
  tax: { type: Number, default: 0 },
  taxType: { type: String },
});
const Category= mongoose.model('Category', categorySchema);

export default Category;