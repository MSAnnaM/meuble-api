import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
       type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    imgURL: {
        type: String,
    },
    information: {
        type: String,
    },
    params: {
        type: Object,
    },
},
    {
        versionKey: false,
        timestamps: { createdAt: 'createdAt' },
     }
);

const Product = mongoose.model('Product', productSchema);

export default Product;