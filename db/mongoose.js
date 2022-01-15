const mongoose = require('mongoose');
const validator = require('validator');

// const db_link = 'mongodb+srv://admin:Password%40123@cluster0.blhys.mongodb.net/task-manager?retryWrites=true&w=majority' 


mongoose.connect( 'mongodb://127.0.0.1:27017/task-manager-api' ,
 {
    useNewUrlParser: true,
    useCreateIndex: true
})
.then((db)=>{
    console.log('done');
})
.catch((e)=>{
    console.log('error');
})

const User = mongoose.model('User' , {
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:6,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('password cannot be password itself')
            }
        }
    },
    age: {
        type: Number,
        validate(value){
            if(value<0){
                throw new Error('Age not valid')
            }
        }
    }
})

const me = new User({
    name:"And",
    email:'and@mail.com',
    password:'pwpdoewpkd;s',
    age: 25
})

me.save()
.then(() => { console.log(me) })
.catch((error) => { console.log("Error" , error) })
