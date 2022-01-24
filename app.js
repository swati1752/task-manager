const express = require('express');
require('./db/mongoose')
const UserR = require('./routers/user');
const TaskR = require('./routers/task');


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