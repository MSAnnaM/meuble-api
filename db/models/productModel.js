import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    uk: { type: String, required: true },
    ru: { type: String, required: true }
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  imgURL: {
    type: String
  },
  price: {
    currency: { type: String, required: true },
    value: { type: Number, required: true }
  },
  params: {
    uk: {
      type: Map,
      of: {
      type: Schema.Types.Mixed,
    },
    },
    ru: {
      type: Map,
      of: {
      type: Schema.Types.Mixed,
    },
    },
    images: [String],
  },
}, {
  versionKey: false,
  timestamps: { createdAt: 'createdAt' }
});

const Product = mongoose.model('Product', productSchema);

export default Product;