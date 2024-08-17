const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    category_name: { type: String, required: true },
    category_description: { type: String },
    category_type: { type: String, enum: ['food', 'drink'], required: true },
},{timestamps:true});

module.exports = mongoose.model('Category', CategorySchema);