const User = require('../models/User')
const crypto = require('crypto')

const createUser =  async (req, res) => {
    try{
        const emailFound  = await User.findOne({email: req.body.email})
        if(emailFound){
            throw new Error('This email is already used')
        }
        // const salt = crypto.randomBytes(16).toString('hex')
        // const hash = crypto.pbkdf2Sync(req.body.password, salt, 10000, 512, 'sha512').toString('hex')
        const newUser = new User(req.body)
        newUser.hashPassword(req.body.password)
        await newUser.save()
        res.json({
            success: true, 
            message: 'User created', 
            id:newUser._id, 
            token: newUser.generateToken() 
        })
    }catch(error){
        res.json({success: false, message: error.message})
    }
  
}

const getUser = async (req, res) => {
    try{
        const user = await User.findById(req.auth.id) 
        res.json({success: true, user})
    }catch(error){
        res.json({success: false, message: error.message})
    }
}

const deleteUser = async (req, res) => {
    try{
        const { id } = req.params
        const productFound =  await User.findByIdAndDelete(id)
        if(!productFound){
            throw new Error('The user is already deleted')
        }
        res.json({success: true, response: 'User deleted'})
    }catch(error){
        res.json({success: false, message: error.message})
    }
}

const editUser = async (req, res) => {
    try{
        const { id } = req.auth
        const { name, lastname, city, street } = req.body
        const user = {name, lastname, address: { city, street}}
        const editedUser = await User.findByIdAndUpdate(id, user, {new: true})
        res.json({success: true, response: 'User edited', user: editedUser})
    }catch(error){
        res.json({success: false, message: error.message})
    }
}

const login = async (req,res) => {
    try{
        const { email, password } = req.body
        const userData = await User.findOne({email})
        if(!userData){
            throw new Error('wrong username or password')
        }

        const hash = crypto.pbkdf2Sync(password, userData.salt, 10000, 512, 'sha512').toString('hex')

        if(userData.password !== hash){
            throw new Error('Password does not match')
        }
        res.json({success: true, message:'You are logged in', token: userData.generateToken()})
    }catch(error){
        res.json({success: false, error: error.message})
    }
}

const validateToken = async (req, res) => {
    res.json({success: true})
}

module.exports = { createUser, getUser, deleteUser, editUser, login, validateToken }

// Para que el usuario se cree una cuenta y despues inicie sesión manualmente el token no se envia en el createuser