import dotenv from "dotenv";
dotenv.config();
import { auth } from "../helpers/token.js";
import User from "../db/models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;


export async function tokenUpdate(data) {
    try {
        const { id } = data;
        const token = auth(id);
        const result = await User.findByIdAndUpdate(id, { $set: { token } }, { new: true });
        return result;
    }
    catch (error) {
        console.error(error.message)
    }
}

export const updateImage = async (tmpUpload) => {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
  const result = await cloudinary.uploader.upload(tmpUpload);
  return result.url;
};