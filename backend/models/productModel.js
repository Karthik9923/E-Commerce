import mongoose from 'mongoose'


const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    bestSeller: { type: Boolean },
    discount: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    date: { type: Number, required: true },
    stock: { type: Boolean, default: true } // New stock field
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
