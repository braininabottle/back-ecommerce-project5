const Product = require('../models/Product')

const getProducts = async (req, res) => {
    try{
        const products = await Product.find()
        res.json({success: true, products})
    }catch(error) {
        res.json({success: false, message: error.message})
    }
}

const createProduct = async (req, res) => {
    try{
        const newProduct = new Product(req.body)
        await newProduct.save() 
        res.json({success: true, message: 'Producto creado', productId: newProduct._id })
    }catch(error){
        res.json({success: false, message: error.message})
    }
}

const deleteProduct = async (req, res) => {
    try{
        const { id } = req.params
        const findID = await Product.findByIdAndDelete(id)
        if(!findID){
            throw new Error('El elemento que intentas borrar, no existe')
        } 
        res.json({ success: true, response: 'Elemento borrado' })
    }catch(error){
        res.json({ success: false, message: error.message })
    }
}

const editProduct = async (req, res) => {
    try{
        const { id } = req.params 
        const findID = await Product.findByIdAndUpdate(id, req.body, { new: true } )
        if(findID){
            throw new Error('El elemento que intentas editar no existe')
        }
        res.json({ success: true })
    }catch(error){
        res.json({ success: false, message: error.message })
    }
}

const getProductById = async (req,res) => {
        try{
            const { id } = req.params
            const product = await Product.findById(id)
            res.json({success: true, product})
        }catch(error) {
            res.json({success: false, message: error.message})
        }
}

const productReducer = async (req,res) => {
    console.log(req.body)
    const products = req.body.cart
    try {
      products.map(async (product) => {
        await Product.findByIdAndUpdate(product._id, { stock: product.stock - product.qty })
      })
      res.json({ success: true, message: 'hola' })
    } catch (error) {
      res.json({ success: false, error: error.message })
    }

}

module.exports ={getProducts, createProduct, deleteProduct, editProduct, getProductById, productReducer}