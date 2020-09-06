

module.exports = (req,res,next) => {
    if(!req.session || !req.session.user) {
        res.status(401).json({message:"Never Should have come here."})
    }
    next();
    console.log(req.session.user)
  
}