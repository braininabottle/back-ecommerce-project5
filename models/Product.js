const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    volume: Number, 
    brand: String,
    stock: Number, 
    imageUrl: String,
    degrees: Number,
    properties: [
        {
            item: String,
            value: String
        }
    ]
})

const Product = mongoose.model('product', productSchema )

module.exports = Product