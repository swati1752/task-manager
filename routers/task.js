const express = require('express');
const { ObjectId } = require('mongoose');
const Task = require('../models/task'); 
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

router.patch('/tasks/:id' , async(req,res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name' , 'description']
    const isValidOperation = updates.every((updates) => allowedUpdates.includes(updates))
    if(!isValidOperation) {
        return res.status(400).send({ error: 'invalid updates'})
    }

    try{
        const task = await Task.findById(req.params.id)
        updates.forEach(updates => {
            task[updates] = req.body[updates]
        });
        await task.save()
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }
    catch {
        res.status(400).send(e)
    }
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