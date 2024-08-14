import Category from "../db/models/categoryModel.js";
import HttpError from "../helpers/HttpError.js";

export const categoryCreate = async (req, res, next) => {
    try {
        const { name } = req.body;
       
        const existingCategory = await Category.findOne({ $or: [{ "name.uk": name.uk }, { "name.ru": name.ru }] });
        if (existingCategory) {
            console.log(existingCategory);
            throw HttpError(400, "Category with this name already exists");
        }

        
        const category = await Category.create({ name });
        res.status(201).json(category);
    } catch (er) {
        next(er);
    }
};

export const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (er) {
        next(er);
    }
};

export const updateCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const { name } = req.body;

        
        const updateFields = {};
        if (name?.uk) {
            updateFields["name.uk"] = name.ua;
            
        }
        if (name?.rus) {
            updateFields["name.ru"] = name.ru;
        }

        if (Object.keys(updateFields).length === 0) {
            throw HttpError(400, "No valid fields provided for update");
        }

        const updatedCategory = await Category.findByIdAndUpdate(categoryId, { $set: updateFields }, { new: true });
        if (!updatedCategory) {
            throw HttpError(404, "Category not found");
        }

        res.status(200).json(updatedCategory);
    } catch (er) {
        next(er);
    }
};


export const deleteCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;

        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            throw HttpError(404, "Category not found");
        }

        res.status(200).json({ message: "Category deleted" });
    } catch (er) {
        next(er);
    }
};