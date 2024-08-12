import Category from "../db/models/categoryModel.js";
import HttpError from "../helpers/HttpError.js";

const categoryCreate = async (req, res, next) => {
    try {
        const { name } = req.body;
        console.log(name);
        
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            throw HttpError(400, "Category with this name already exists");
        }
       await Category.create({name});
        res.status(201).json({message: "Category created"});
    } catch (er) {
        next(er);
    }

}
export default categoryCreate;