const express = require('express');
require('./db/mongoose')
const UserR = require('./routers/user');
const TaskR = require('./routers/task');
require ('dotenv').config()

const app = express()

const port = process.env.PORT



app.use(express.json())
app.use(UserR)
app.use(TaskR)


app.listen( port , ()=>{
    console.log(`Server running at port ${port}`);
})


