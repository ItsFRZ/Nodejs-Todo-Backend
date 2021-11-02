const express = require('express');
const bodyParser = require('body-parser');
const TodoController = require('../contoller/TodoController');
const authenticate = require('../security/authenticate');

const TodoRouter = express.Router();
TodoRouter.use(bodyParser.json());

TodoRouter.route('/')
.get(authenticate.verifyUser,TodoController.getAllTodo)
.post(authenticate.verifyUser,TodoController.insertTodo)
.delete(authenticate.verifyUser,TodoController.removeAllTodo);


TodoRouter.route('/:todoId')
.get(authenticate.verifyUser,TodoController.getTodoById)
.put(authenticate.verifyUser,TodoController.updateTodoById)
.delete(authenticate.verifyUser,TodoController.removeTodoById);


module.exports = TodoRouter;