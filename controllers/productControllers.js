import Product from "../db/models/productModel.js";
import Category from "../db/models/categoryModel.js";
import HttpError from "../helpers/HttpError.js";

export const createProduct = async (req, res, next) => {
  try {
      const { name, category, imgURL, information, params } = req.body;
      const existingCategory = await Category.findOne({ name: category });

      if (!existingCategory) {
      throw HttpError(404, "Role not found");
      }
    
    const idCategory = existingCategory._id
    const newProduct = await Product.create({ name, idCategory, imgURL, information, params });
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true, runValidators: true });

    if (!updatedProduct) {
      throw HttpError(404, "Product not found");
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      throw HttpError(404, "Product not found");
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};