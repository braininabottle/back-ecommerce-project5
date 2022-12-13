const mongoose =  require('mongoose')

mongoose.connect(process.env.MONGO_DB)
.then(() => console.log('DB CONNECTED!'))
.catch(()=>console.log('connection failed'))