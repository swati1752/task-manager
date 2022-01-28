const mongoose = require('mongoose');
const validator = require('validator');

// const db_link = 'mongodb+srv://admin:Password%40123@cluster0.blhys.mongodb.net/task-manager?retryWrites=true&w=majority' 


mongoose.connect( 'mongodb://127.0.0.1:27017/task-manager-api' ,
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
