const mongoose= require('mongoose')
const coneccionDatabase=process.env.MONGODB_CNN

mongoose.connect(coneccionDatabase)
.then(db=> console.log('DB is connected'))
.catch(err=> console.log(err))