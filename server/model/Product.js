const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    colorName: {
        type: String,
        required: true
    },
    photos: {
        type: Array,
        required: true
    },
    size:  {
        type: Array,
        required: true
    },
    slug: {
        type: String, 
        required: true
    }
})

const ProductModel = mongoose.model('products', ProductSchema)
module.exports = ProductModel