const express = require('express');
const User = require('../models/task'); 
const router = express.Router();

router.get('/tasks' , async (req,res) => {
    try {
    const task = await Task.find({})
        res.send(task)
    }
    catch (e) { res.send('404 ERROR') }
})

router.get('/tasks/:id' , async (req,res)=>{
    const _id = req.params.id
    try {
    const task = await Task.findById(_id)
        res.send(task)
    } 
    catch(e) { res.send('not found')}
})

router.post('/tasks' , async (req,res)=>{
    const newtask = new Task(req.body)
    try {
    newtask.save()
    res.status(201).send(newtask) 
    }
    catch  { res.status(500).send()}
})


router.delete('/tasks/:id', async (req, res) => {
    const task = await Task.findOneAndDelete(req.params.id)
    try {

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router