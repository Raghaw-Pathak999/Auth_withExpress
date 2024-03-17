const express = require('express');

const authRouter = express.Router();
const jwtAuth = require('../midellware/jwtAuth')
const { signup, login, getuser } = require('../controller/contoller')

authRouter.post('/signup', signup)
authRouter.post('/login', login)
authRouter.get('/getuser',jwtAuth , getuser)

module.exports = authRouter;
