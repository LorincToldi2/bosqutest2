const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    products: {
        type: Array,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    orderDate: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    providedEmail: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    megye: {
        type: String,
        required: true
    },
    varos: {
        type: String,
        required: true
    },
    cim: {
        type: String,
        required: true
    }
})

const OrderModel = mongoose.model('orders', OrderSchema)
module.exports = OrderModel