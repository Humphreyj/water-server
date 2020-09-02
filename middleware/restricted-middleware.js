const jwt = require('jsonwebtoken');
const secret =  require('../config/secret');

module.exports = (req,res,next) => {
    if(!req.session || !req.session.user) {
        res.status(401).json({message:"Never Should have come here."})
    }
    next()
    // const [authType,token] = req.headers.authorization.split(" ");
    // console.log(token)
    // if(token) {
    //     jwt.verify(token,secret.jwtSecret, (err, decodedToken) => {
    //         if(err) {
    //             res.status(401).json({message:"Never Should have come here without a token"})
    //         }else {
    //             req.decodedJwt = decodedToken;
    //             next();
    //         }
    //     })
    // }else {
    //     res.status(401).json({message:"Never Should have come here."})
    // }
}