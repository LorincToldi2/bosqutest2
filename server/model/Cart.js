const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    email:  {
        type: String,
        required: true
    },
    product: {
        type: Object,
        required: true
    }, 
    selectedSize: {
        type: String,
        required: true
    }
})

const CartModel = mongoose.model('cart', CartSchema)
module.exports = CartModel