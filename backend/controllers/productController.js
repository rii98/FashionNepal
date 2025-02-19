import { v2 as cloudinary } from "cloudinary";
import Product from "../models/productModel.js";

//add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (image) => image !== undefined
    );
    //cloudinary upload
    let imagesUrl = await Promise.all(
      images.map(async (image) => {
        let result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes,
      bestSeller: bestSeller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };
    const product = new Product(productData);
    await product.save();
    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//remove product
const removeProduct = async (req, res) => {
    try {
        const productId = req.body.id;
        await Product.findByIdAndDelete(productId);
        return res.json({success:true,message:"Product removed successfully"})
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

//list products
const listProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.json({success:true,products})
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//get single product
const getSingleProduct = async (req, res) => {
    try {
          const {productId} = req.body
          const product = await Product.findById(productId)
          if(!product){
            return res.json({success:false,message:"Product not found"})
          }
          return res.json({success:true,product})
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export { addProduct, removeProduct, listProducts, getSingleProduct };
