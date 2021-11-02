const express = require('express');
const bodyParser = require('body-parser');
const TodoController = require('../contoller/TodoController');


const TodoRouter = express.Router();
TodoRouter.use(bodyParser.json());

TodoRouter.route('/')
.get(TodoController.getAllTodo)
.post(TodoController.insertTodo)
.delete(TodoController.removeAllTodo);


TodoRouter.route('/:todoId')
.get(TodoController.getTodoById)
.put(TodoController.updateTodoById)
.delete(TodoController.removeTodoById);


module.exports = TodoRouter;