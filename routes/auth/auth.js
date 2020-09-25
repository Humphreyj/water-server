const express = require('express');
const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const user_db = require('../../models/user-model');
const jwt = require('jsonwebtoken');
const secrets = require('../../config/secret');

router.post('/register', async (req, res, next)=> {
    try{
        const {email} = req.body;
        const user = await user_db.findByEmail({email})
        
        if(user) {
            console.log(user)
            res.status(409).json({message: "There is an account associated with this email, please try logging in."})
        }else {
            const result = await user_db.register(req.body)
            console.log(result)
            res.status(200).json(result)
            return result
        }
       
    }catch(err){
        next(err)
    }
})//Register new User

router.post('/login', async(req, res, next) => {
    try {
        const {email, password} = req.body;

        const user = await user_db.findByEmail({email})
        const passwordValid = await bcrypt.compare(password,user.password);
        console.log(user)
        if (user && passwordValid) {
            req.session.user = user;
            // const token = generateToken(user)
            console.log(user)
            console.log(req.session.user)
            delete user.password
            res.status(200).json(user)
        }else {
            res.status(404).json({message: "The Email/Password you provided is wrong!"})
        }
    }catch(err) {
        console.log(err)
        res.status(500).json({message: 'Something went wrong. Sorry my dude.'})
    }
})

function generateToken(user) {
    const payload = {
        subject: user.id
    }
    const options = {
        expiresIn: '8h'
    }
    return jwt.sign(payload,secrets.jwtSecret, options)
}
//generate token

router.get('/logout', (req, res) => {
    try{
        if(req.session) {
            req.session.destroy(err => {
                if(err) {
                    res.json({message: "Something went wrong."})
                }else {
                    res.status(204).json({message: "You have been logged out. Thanks for coming!"})
                }
            })
        }else {
            res.status(200).json({message: 'You were not logged in even.'})
        }
    }catch(err) {
        console.log(err)
    }
    
})

router.get('/session/', async(req, res) => {
    const token = req.cookies || ''
    try{
        if(token){
            let user = await req.session.user
             if(!user) {
                 console.log('no user')
                 res.status(404).send({message: `No user`})
             }else {
               delete user.password
               res.status(200).send(user)
             }
           }else{
              console.log('this happenend')
              res.status(200).send({message: `No valid session`})
           }
    }catch(err){
        console.log(err)
    }
   
 })



module.exports = router;