const express = require('express');
const UserModel = require('../model/UserModel');
const authenticate = require('../security/authenticate');


exports.getAllUser = (req,res,next) => {
    UserModel.find({})
    .then((users) => {
        if(users){
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(users)
        }
    },(err) => next(err))
    .catch((err) => next(err));
}


exports.signup = (req,res,next) => {
    UserModel.register(
        new UserModel({username : req.body.username}),
        req.body.password,(err,user))
        
}
