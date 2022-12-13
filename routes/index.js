const express = require('express')
const { 
    getProducts, 
    createProduct, 
    deleteProduct ,
    editProduct,
    getProductById,
    productReducer
} = require('../controllers/productsControllers')

const router = express.Router()

const { 
    createUser,
    getUser,
    deleteUser,
    editUser, 
    login,
    validateToken
} = require('../controllers/userControllers')
const auth = require('../middlewares/auth')

router.route('/products').get(getProducts).post(createProduct)
router.route('/products/:id').delete(deleteProduct).put(editProduct).get(getProductById)
router.route('/products/reducedstock').put(productReducer)

router.route('/users').post(createUser).get(auth, getUser).put(auth, editUser)
router.route('/users/:id').delete(deleteUser)
router.route('/users/login').post(login).get(auth, validateToken)

module.exports = router