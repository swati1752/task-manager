const express = require('express');
require('./db/mongoose')
const UserR = require('./routers/user');
const TaskR = require('./routers/task');
const req = require('express/lib/request');

const app = express()
const port = process.env.PORT || 3000

// const multer = require('multer');
// const upload = multer({
//     dest : 'images'
// })

// app.post('/upload', upload.single('upload'), (req, res) =>{
//     res.send()
//   })

app.use(express.json())
app.use(UserR)
app.use(TaskR)


app.listen( port , ()=>{
    console.log('Server running at port 3000');
})


