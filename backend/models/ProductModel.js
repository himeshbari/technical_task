import  mongoose  from "mongoose";


const productSchema = mongoose.Schema(
  {
   
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
      required: true,
    },
    attributes: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    salePrice: {
      type: Number,
      required: true,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    photo: {
      type: String,
     
    },
    tax: {
      type: String,
      required: true,
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  }

);

const Product = mongoose.model("Product", productSchema);
export default Product;
