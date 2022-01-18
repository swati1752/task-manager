const express = require('express');
require('./db/mongoose')
const Task = require('./models/task');
const User = require('./models/user');


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/users' , (req,res) =>{
    res.send('hohohoh')
})

app.post('/users' , (req,res)=>{
    const user = new User(req.body)
    user.save()
    .then(() => { res.send(user) })
    .catch((error) => { res.send('404')})
})

app.get('/tasks' , (req,res) =>{
    res.send('hahahaa')
})

app.post('/tasks' , (req,res)=>{
    const newtask = new Task(req.body)
    newtask.save()
    .then(() => { res.send(newtask) })
    .catch((error) => { res.send('404')})
})

app.listen( port , ()=>{
    console.log('Server running at port 3000');
})