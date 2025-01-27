import Product from "../models/product.model.js";
import cloudinary from "../db/cloudinary.js";

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category, stock: { $gt: 0 } });
    res.status(200).json(products);
  } catch (error) {
    console.log("Error in get products by category:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProductById = async (req,res) =>{
  try {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product)
    } catch (error) {
    console.log("Error in get product by id:", error.message);
    res.status(500).json({error: "Internal Server Error"});
  }
}
export const addProduct = async (req, res) => {
  try {
    const { productName, description, price, image, category, stock } =
      req.body;

    if (!productName || !description || !price || !stock) {
      return res.status(401).json({ message: "All the fields are required" });
    }

    if (isNaN(price)) {
      return res.status(400).json({ message: "Price must be a  number" });
    }

    let cloudinaryResponse;
    try {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    } catch (uploadError) {
      console.log("Cloudinary upload error: ", uploadError.message);
      return res.status(500).json({ message: "Image upload failed" });
    }

    const newProduct = new Product({
      productName,
      description,
      price,
      image: cloudinaryResponse?.secure_url || " ",
      category,
      stock,
    });

    const savedProduct = await newProduct.save();

    if (savedProduct) {
      res.status(201).json(savedProduct);
    }
  } catch (error) {
    console.log("Error in add Product ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0]; // get image id

      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);

        console.log("deleted image from cloudinary");
      } catch (error) {
        console.log("error deleting image form cloudinary", error);
      }

      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: "Product deleted sucessfully" });
    }
  } catch (error) {
    console.log("Error in delete Product ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log("Error in get all products ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const updateStock = async (req, res) => {
  try {
    const {id} = req.params;
      const { stock} = req.body;
    const product = await Product.findById(id);
    if(!product){
      return res.status(404).json({message: "Product not found"})
    }
    product.stock = stock;
  const result = await product.save();
  res.status(200).json(result);
  
  } catch (error) {
    console.log("Error in update stock ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFilteredProducts = async (req, res) => { 
  try {
    const { query } = req.params;

     if (!query) {
       return res.status(400).json({ message: "Query parameter is required" });
     }
    const products = await Product.find({ productName: { $regex: query, $options: "i" } });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    } else {
      res.status(200).json(products);}


    
}catch (error) {
    console.log("Error in get filtered products ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  } 

}
