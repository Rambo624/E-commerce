const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  couponcode: { type: String, required: true, unique: true },
  discountPercentage: { type: Number, required: true },
  validFrom: { type: Date, required: true },
  validTo: { type: Date, required: true },
  usageLimit: { type: Number, default: 1 },
  usedCount: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
});

module.exports = mongoose.model('Coupon', couponSchema);
