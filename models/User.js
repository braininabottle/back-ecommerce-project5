const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    email: { type: String, required: true},
    password: {type:String, required: true, minLenght: 8 },
    name: {
        type: String,
        trim: true,
        lowercase: true,
        default: ''
    },
    lastname: {
        type: String,
        trim: true,
        lowercase: true,
        default:''
    },
    address: {
        street: { type: String, default: ''},
        city: { type: String, default: ''}
    },
    salt: {type: String, required: true}
})

userSchema.methods.hashPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
}

userSchema.methods.generateToken = function () {
    const token = jwt.sign({id:this._id}, process.env.SECRET)
    return token
}
const User = mongoose.model('user', userSchema )

module.exports = User               