import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    ua: { type: String, required: true },
    rus: { type: String, required: true },
  },
}, 
  { versionKey: false }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;