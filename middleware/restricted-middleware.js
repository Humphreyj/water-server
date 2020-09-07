

module.exports = (req,res,next) => {
    let user = req.session.user;
    if(!req.session || !req.session.user) {
        res.status(401).json({message:"Never Should have come here."})
    }else {
        delete user.password
        res.status(200).json(req.session.user)
    }
    next();
    console.log(req.session.user)
  
}