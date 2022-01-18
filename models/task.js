const mongoose = require('mongoose');
const validator = require('validator');

const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    }
})

const Task = mongoose.model('Task' , TaskSchema)

module.exports = Task;
