let express = require('express');
const passport = require('passport');
let UserRouter = express.Router();
let UserController = require('../contoller/UserController');
let authenticate = require('../security/authenticate');

/* GET users listing. */
UserRouter.get('/',authenticate.verifyUser,authenticate.verifyAdmin,UserController.getAllUser);
UserRouter.post('/signup',UserController.signup);
UserRouter.post('/login',passport.authenticate('local'),UserController.login);

module.exports = UserRouter;
