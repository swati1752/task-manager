const mongoose = require('mongoose');
const validator = require('validator');
if (process.env.NODE_ENV !== 'production') 
require ('dotenv').config()
// const db_link = 'mongodb+srv://admin:Password%40123@cluster0.blhys.mongodb.net/task-manager?retryWrites=true&w=majority' 


mongoose.connect( process.env.MONGO_URL ,
 {
    useNewUrlParser: true,
    useCreateIndex: true
})
.then((db)=>{
    console.log('mongod done');
})
.catch((e)=>{
    console.log('database error');
})
