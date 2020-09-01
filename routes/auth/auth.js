const express = require('express');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const user_db = require('../../models/user-model');
const jwt = require('jsonwebtoken');
const secrets = require('../../config/secret');

router.post('/register', require('../../middleware/RegisterErrorHandler')(), async (req, res, next)=> {
    try{
        const {email} = req.body;
        const user = await user_db.findByEmail({email}).first()
        if(user) {
            console.log(user)
            res.status(409).json({message: "There is an account associated with this email, please try logging in."})
        }else {
            res.status(200).json(await user_db.register(req.body))
        }
       
    }catch(err){
        next(err)
    }
})//Register new User

router.post('/login', async(req, res, next) => {
    try {
        const {email, password} = req.body;

        const user = await user_db.findByEmail({email}).first()
        const passwordValid = await bcrypt.compare(password,user.password);

        if (user && passwordValid) {
            req.session.user = user;
            const token = generateToken(user)
            res.status(200).json({token,id:user.id,display: user.display_name})
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
    if(req.session) {
        req.session.destroy(err => {
            if(err) {
                res.json({message: "Something went wrong."})
            }else {
                res.status(200).json({message: "You have been logged out. Thanks for coming!"})
            }
        })
    }else {
        res.status(200).json({message: 'You were not logged in even.'})
    }
})



module.exports = router;