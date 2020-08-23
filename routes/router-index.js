const router = require('express').Router();

router.use('/restaurants', require('./restaurants/restaurants'));
router.use('/auth', require('./auth/auth'));


module.exports = router;