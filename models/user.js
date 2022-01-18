const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema( {
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
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

const User = mongoose.model('User' , UserSchema);

module.exports = User;