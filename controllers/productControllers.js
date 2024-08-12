import Product from "../db/models/productModel.js";
import Category from "../db/models/categoryModel.js";
import HttpError from "../helpers/HttpError.js";
import { updateImage } from "../services/userServices.js";

export const createProduct = async (req, res, next) => {
  try {
    const { name, category, information } = req.body;
    const image = req.file;
    
      const existingCategory = await Category.findOne({ name: category });

      if (!existingCategory) {
      throw HttpError(404, "Category not found");
      }
    
    const idCategory = existingCategory._id
    const imgURL = await updateImage(image.path);
    const params = JSON.parse(req.body.params);
    
    const newProduct = await Product.create({ name, category: idCategory, imgURL, information, params });
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
    const {name, category, information, params} = req.body

    let product = await Product.findById(productId);
    if (!product) {
      throw HttpError(404, "Product not found");
    }
    if (name) product.name = name;
    if (category) {
      const existingCategory = await Category.findOne({ name: category });

      if (!existingCategory) {
      throw HttpError(404, "Category not found");
      }
      product.category = existingCategory._id
    }

    if (information) product.information = information;

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