const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)
const productsCategorySchema = new mongoose.Schema({
    title: String,
    parent_id: {
        type: String,
        default: ""
    },
    description: String,
    thumbnail: String,
    status: String,
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    position: Number,
    deletedAt: Date

}, { timestamps: true });
const ProductCategory = mongoose.model('ProductCategory', productsCategorySchema, "products-category");
module.exports = ProductCategory;