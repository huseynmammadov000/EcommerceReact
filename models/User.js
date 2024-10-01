const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order', default: [] }],
    basket: [{ type: mongoose.Schema.ObjectId, ref: 'Product', default: [] }],
}, {
    timestamps: true
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
