const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: { type: String, required: true, maxlength: [50, "Title must be shorter than 50 characters"] },
    description: { type: String, required: true, maxlength: [200, "Description cannot be more than 200 characters"] },
    price: { type: Number, required: true },
    category: { type: String, required: true, enum: ["Books", "Clothing", "Technology","Game","Toy"] },
    stock: { type: Number, required: true },
    imageUrl: { type: [String], required: true},
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    currency: { type: String, enum: ["$", "AZN", "EUR","TRY"], default: "AZN"},
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;