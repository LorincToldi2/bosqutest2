const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
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

const WishlistModel = mongoose.model('wishlist', WishlistSchema)
module.exports = WishlistModel