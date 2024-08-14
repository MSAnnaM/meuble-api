import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    uk: { type: String, required: true },
    ru: { type: String, required: true },
  },
}, 
  { versionKey: false }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;