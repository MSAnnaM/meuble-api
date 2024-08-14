import Product from "../db/models/productModel.js";
import Category from "../db/models/categoryModel.js";
import HttpError from "../helpers/HttpError.js";
import { updateImage } from "../services/userServices.js";

export const createProduct = async (req, res, next) => {
  try {
    // const { title, category, price, params } = req.body;
    const { category } = req.body;
    const title = JSON.parse(req.body.title);
    let params = JSON.parse(req.body.params);
    const price = JSON.parse(req.body.price);
    const files = req.files;
    
      const existingCategory = await Category.findOne({ 
      $or: [{ 'name.uk': category }, { 'name.ru': category }] 
      });
    
    
      if (!existingCategory) {
      throw HttpError(404, "Category not found");
      }
    const idCategory = existingCategory._id


    const imgURL = await updateImage(files.file[0].path);
    let paramsImages = [];
    if (files.images && files.images.length > 0) {
      paramsImages = await Promise.all(
    files.images.map(file => updateImage(file.path))
  );
    }
    params.images = paramsImages;
    
    const newProduct = await Product.create({ title, category: idCategory, imgURL, price, params });
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
    // const { category } = req.body;
    const { title, category, price, params } = req.body;
    const files = req.files;

    let product = await Product.findById(productId);
    if (!product) {
      throw HttpError(404, "Product not found");
    }

    if (title) {
      const titleParsed = JSON.parse(req.body.title);
      product.title = { ...product.title.toObject(), ...titleParsed };
    };

    if (category) {
      const existingCategory = await Category.findOne({ 
      $or: [{ 'name.uk': category }, { 'name.ru': category }] 
      });

      if (!existingCategory) {
      throw HttpError(404, "Category not found");
      }
      
      product.category = existingCategory._id
    }

    if (price) {
      const priceParced = JSON.parse(req.body.price);
      product.price = { ...product.price.toObject(), ...priceParced };
    };

    if (files && files.file) {
      product.imgURL = await updateImage(files.file[0].path)
    };

    if (files && files.images) {
      const existingImages = product.params.images || [];
      const paramsImages = await Promise.all(
        files.images.map(file => updateImage(file.path)));
      
      product.params.images = [...existingImages, ...paramsImages];
    };

    if (params) {
      let parsedParams = JSON.parse(req.body.params);
      Object.entries(parsedParams).forEach(([lang, langParams]) => {
  if (!langParams) return;

  Object.entries(langParams).forEach(([key, value]) => {
    if (!value) return;

    const existingValue = product.params[lang].get(key) || {};

    if (typeof value === 'object') {
      product.params[lang].set(key, {
        ...existingValue,
        ...value,
      });
    } else {
      product.params[lang].set(key, value);
    }
  });
});
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, product, { new: true, runValidators: false });

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