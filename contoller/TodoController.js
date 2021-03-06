const express = require('express');
const TodoModel = require('../model/TodoModel');

exports.getAllTodo = (req,res,next) => {
    TodoModel.find({})
    .populate('user')
    .then((todo) => {
        if(todo != null && req.user._id != null){
            
            let data = todo;
            let flag = false;
            
            let personalUserData = [];

            for(let i = 0; i < data.length ;i++){
                if((data[i].user._id).toString() == (req.user._id).toString())
                    {
                        flag = true;
                        personalUserData.push(data[i]);
                    }
            }


            if(flag){
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(personalUserData);   
            }else{
                res.statusCode = 404;
                res.setHeader('Content-Type','application/json');
                res.json({status : true , msg : "User Data not found"});   
            }

        }
    },(err) => next(err))
    .catch((err) => next(err));
};

exports.insertTodo = (req,res,next) => {
    TodoModel.create(req.body)
    .then((todo) => {
        if(todo){
           
            if(req.user._id){
                todo.user = req.user._id;
                todo.save()
                .then((todo) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json');
                    res.json({status : true , success : 'Todo Inserted Successfull !', todo : todo});
                })
            }else{
                let err = new Error('User is not authorized');
                err.status = 401;
                return next(err);

            }


        }
    },(err) => next(err))
    .catch((err) => next(err));
};

exports.removeAllTodo = (req,res,next) => {
    TodoModel.find({})
    .populate('user')
    .then((todo) => {
        if(todo != null && req.user._id != null){
            
            for(let i = 0; i < todo.length ;i++){
                if((todo[i].user._id).toString() == (req.user._id).toString())
                    {
                        flag = true;
                        todo[i].remove();
                    }
            }


            if(flag){
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json({status : true , msg : "User Data is Deleted Successfully"});   
            }else{
                res.statusCode = 404;
                res.setHeader('Content-Type','application/json');
                res.json({status : true , msg : "User Data not found"});   
            }

        }else{
            res.statusCode = 404;
            res.setHeader('Content-Type','application/json');
            res.json({status : true , msg : "User Data not found"});   
        }
    },(err) => next(err))
    .catch((err) => next(err));

    
}

exports.getTodoById = (req,res,next) => {
    TodoModel.findById(req.params.todoId)
    .populate('user')
    .then((todo) => {
        if(todo != null){

            let id1 = req.user._id;
            let id2 = todo.user._id;

            if(id1.toString() === id2.toString()){
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(todo);
            }else{
                res.statusCode = 401;
                res.setHeader('Content-Type','application/json');
                res.json({status : true, msg : 'Unauthorized User'});
            }

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
        .populate('user')
        .then((todo) => {
            if(todo != null){


                let id1 = req.user._id;
                let id2 = todo.user._id;
    
                if(id1.toString() === id2.toString()){

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
                    res.statusCode = 401;
                    res.setHeader('Content-Type','application/json');
                    res.json({status : true, msg : 'Unauthorized User'});
                }

              

            }else{
                let err = new Error('Todo '+req.params.todoId+" not found");
                err.status = 404;
                return next(err);
            }
        },(err) => next(err))
        .catch((err) => next(err));

  
};

exports.removeTodoById = (req,res,next) =>{
    TodoModel.findById(req.params.todoId)
    .populate('user')
    .then((todo) => {
        if(todo != null){


            
            let id1 = req.user._id;
            let id2 = todo.user._id;
           
            
            if(id1.toString() === id2.toString()){
            
                TodoModel.findByIdAndRemove(req.params.todoId)
                .then((todo)=>{
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json');
                    res.json({success : true,status : "Todo Deleted Succesfully !"});
            
                },(err) => next(err))
                .catch((err) => next(err))

            }else{
                    res.statusCode = 401;
                    res.setHeader('Content-Type','application/json');
                    res.json({status : true, msg : 'Unauthorized User'});
            }
        }else{
            let err = new Error('Todo '+req.params.todoId+" not found");
            err.status = 404;
            return next(err);
        }
    },(err) => next(err))
    .catch((err) => next(err));
};