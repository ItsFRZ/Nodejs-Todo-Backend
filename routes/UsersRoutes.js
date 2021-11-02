let express = require('express');
let UserRouter = express.Router();
let UserController = require('../contoller/UserController');

/* GET users listing. */
UserRouter.get('/',UserController);

module.exports = UserRouter;
