import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide product name"],
  },
  description: {
    type: String,
    required: [true, "Please provide product description"],
  },
  price: {
    type: Number,
    required: [true, "Please provide product price"],
  },
  discountPercentage: {
    type: Number,
    required: [true, "Please provide product discount"],
  },
  stock: {
    type: Number,
    required: [true, "Please provide product stock"],
  },
  description: {
    type: String,
    required: [true, "Please provide product description"],
  },
  rating: {
    type: Number,
  },
  brand: {
    type: String,
    required: [true, "Please provide product brand"],
  },
  category: {
    type: String,
    required: [true, "Please provide product category"],
  },
  images:{
    type:[],
    required:[true,'Please provide atleast one image']
  },
  createdBy:{
    type:mongoose.Schema.ObjectId,
    required:true,
    ref:'User'
  }
});

export const Product = mongoose.model("Product", schema);
