const express = require('express');
require('./db/mongoose')
const UserR = require('./routers/user');
const TaskR = require('./routers/task');
const req = require('express/lib/request');

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(UserR)
app.use(TaskR)


// ObjectId("61e6b272be95f2d6e86560f9") - users
// ObjectId("61e4f17d060a1c64e097b8d1") - tasks

app.listen( port , ()=>{
    console.log('Server running at port 3000');
})


// const Task = require('./models/task');
// const User = require('./models/user');

// const main = async () =>{
//     const user = await User.findById('61f77b9508791071c8be2a6f')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks);
// }

// main()
