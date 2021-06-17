const { createUser } = require('../users/userController');
const { login } = require('./authController');
const router = require('express').Router();


router.post('/signin', login);
router.post('/signup', createUser)



module.exports = router