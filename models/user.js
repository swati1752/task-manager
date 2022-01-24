const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

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

UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email })
    if (!user) {
        throw new Error("Unable to login")
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error("Unable to login")
    }
    console.log('gottt itttt');
    return user
}

UserSchema.pre('save' , async (next) =>{
    
    console.log('Just before saving');
    next()
})
UserSchema.pre('save', async function() {
     let salt = await bcrypt.genSalt(10)
     let hashString = await bcrypt.hash(this.password, salt)
     this.password = hashString
  });

const User = mongoose.model('User' , UserSchema);

module.exports = User;