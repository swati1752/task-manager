const express = require('express');
const { ObjectId } = require('mongoose');
const User = require('../models/user'); 
const router = express.Router();

router.get('/users' , async (req,res) =>{
    try{
        const user = await User.find({})
        res.send(user)
    }
    
    catch (e) { res.status(500).send()} 
})

router.get('/users/:id' , async (req,res)=>{
    const _id = req.params.id

    try{
        const user = await User.findById(_id)
        if(!user){
            res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
    })

router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user: user ,token})
        // res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users' , async (req,res)=>{
    const user = new User(req.body)
    try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({user,token})
    }
    catch(error) { res.status(500).send(e)}
})

router.patch('/users/:id' , async(req,res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name' , 'email' , 'password' , 'age']
    const isValidOperation = updates.every((updates) => allowedUpdates.includes(updates))
    if(!isValidOperation) {
        return res.status(400).send({ error: 'invalid updates'})
    }

    try{
        const user = await User.findById(req.params.id)
        updates.forEach(updates => {
            user[updates] = req.body[updates]
        });
        await user.save()
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }
    catch {
        res.status(400).send(e)
    }
})


router.delete('/users/:id', async (req, res) => {
    const user = await User.findOneAndDelete(req.params.id)
    try {

        if (!user) {
            res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router