import mongoose from 'mongoose';
//sub category model
const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  taxApplicable: {
    type: Boolean,
    default: null
  },
  tax: {
    type: Number,
    default: null
  },
  // Reference to the Category model
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

const SubCategory = mongoose.model('SubCategory', subCategorySchema);
export default SubCategory;
