const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema({
    product_name: {
        type: String,
        required: true
    },
    product_price: {
        type: String,
        required: true
    },
    product_detail: {
        type: String,
        required: true
    },
    product_image: {
        type: String,
        required: true
    },
    product_amount: {
        type: Number,
        required: true
    },
    product_selled: {
        type: Number,
        required: false
    },
    machine_id: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("product", Product);