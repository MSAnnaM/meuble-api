import Category from "../db/models/categoryModel.js";
import HttpError from "../helpers/HttpError.js";

const categoryCreate = async (req, res, next) => {
    try {
        const { name } = req.body;
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            throw HttpError(400, "Role with this name already exists");
        }
       await Role.create({name});
        res.status(201).json({message: "Role created"});
    } catch (er) {
        next(er);
    }

}
export default categoryCreate;