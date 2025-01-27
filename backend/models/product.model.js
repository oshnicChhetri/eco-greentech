import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    image: {
      type: String,
      //   required: true,
    },
    // publisher: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },

    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 1,
    },

    // isFeatured: {
    //     type: Boolean,
    //     default : false,
    // },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
