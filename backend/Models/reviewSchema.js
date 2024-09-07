const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to the Product
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User who made the review
    rating: { type: Number, required: true, min: 1, max: 5 }, // Rating from 1 to 5
    comment: { type: String }, // Optional comment text
    createdAt: { type: Date, default: Date.now },
  }
);

module.exports = mongoose.model('Review', reviewSchema);
