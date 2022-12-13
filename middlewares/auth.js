 const { expressjwt } = require('express-jwt')

 const getToken = (req,res) => {
    const { authorization } = req.headers
    if(authorization){
       const [type, token ] = authorization.split(' ')
       return type === 'Bearer' ? token : null
    }
    return null
 }

 const auth = expressjwt({
   secret: process.env.SECRET,
   algorithms: ['HS256'],
   userProperty: 'user',
   getToken
 })

module.exports = auth