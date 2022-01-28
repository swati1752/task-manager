const express = require('express');
const { ObjectId } = require('mongoose');
const User = require('../models/user'); 
const auth = require('../middlewear/auth.js');
const router = express.Router();

// login 
router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user:user, token})
        // res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// logout
router.post('/users/logout' , auth , async(req,res) => {
    try{
        req.user.tokens =req.user.tokens.filter( token =>{
            return token.token !== req.token
        })
        await req.user.save()
         
        res.status(200).send('Logged out successfully!!')
    }catch(e){
        res.status(500).send("error")
    }
})

// logout all user
router.post('/users/logoutAll', auth, async (req, res) => {
    console.log()
    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send('Logged out from all devices successfully');
    }
    catch (error) {
        res.status(500).send(error);
    }
})

// create user
router.post('/users' , async(req,res) => {
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch(e) {
        res.status(400).send(e)
    }
})


// read user
router.get('/users/me' , auth , async (req,res) =>{
    // try {
    //     const user = await User.find({})
    //     res.send(req.user)
    // } catch(e){
    //     res.status(500).send()
    // }
    res.send(req.user)


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