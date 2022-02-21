import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
}, { timestamps: true });

export default mongoose.model('product', productSchema);
