const mongoose = require('mongoose');

const productSizeSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  sizeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Size', required: true },
});

module.exports =  mongoose.model('ProductSize', productSizeSchema);
