const express = require('express');
const TodoModel = require('../model/TodoModel');

exports.getAllTodo = (req,res,next) => {
    TodoModel.find({})
    .then((todo) => {
        if(todo){
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(todo);
        }
    },(err) => next(err))
    .catch((err) => next(err));
};

exports.insertTodo = (req,res,next) => {
    TodoModel.create(req.body)
    .then((todo) => {
        if(todo){
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json({status : true , success : 'Todo Inserted Successfull !', todo : todo});
        }
    },(err) => next(err))
    .catch((err) => next(err));
};

exports.removeAllTodo = (req,res,next) => {

    TodoModel.remove({})
    .then((todo) => {
        if(todo){
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json({status : true , success : 'Todo Deleted Successfully !', todo : todo});
        }
    },(err) => next(err))
    .catch((err) => next(err));

}

exports.getTodoById = (req,res,next) => {
    TodoModel.findById(req.params.todoId)
    .then((todo) => {
        if(todo != null){
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(todo);
        }else{
            let err = new Error('Todo '+req.params.todoId+" not found");
            err.status = 404;
            return next(err);
        }
    },(err) => next(err))
    .catch((err) => next(err));
};


exports.updateTodoById = (req,res,next) => {
        TodoModel.findById(req.params.todoId)
        .then((todo) => {
            if(todo != null){

               if(req.body.todo){
                   todo.todo = req.body.todo;
               }
               if(req.body.isChecked){
                   todo.isChecked = req.body.isChecked;
               }

               todo.save()
               .then((todo)=>{
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json');
                    res.json({success : true,status : "Todo Updated Succesfully !",todo : todo});
               },(err) => next(err))
               .catch((err) => next(err));

            }else{
                let err = new Error('Todo '+req.params.todoId+" not found");
                err.status = 404;
                return next(err);
            }
        },(err) => next(err))
        .catch((err) => next(err));

  
};

exports.removeTodoById = (req,res,next) =>{
    TodoModel.findByIdAndRemove(req.params.todoId)
    .then((todo) => {
        if(todo != null){
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json({status : true, success : "Todo Deleted Successfully !",todo : todo});
        }else{
            let err = new Error('Todo '+req.params.todoId+" not found");
            err.status = 404;
            return next(err);
        }
    },(err) => next(err))
    .catch((err) => next(err));
};