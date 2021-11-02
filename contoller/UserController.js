const express = require('express');
const passport = require('passport');
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
        req.body.password,(err,user) => {
            if(err){
                err.statusCode = 500;
                res.setHeader('Content-Type','application/json');
                res.json(err);
            }else {

                if(req.body.firstname){
                    user.firstname = req.body.firstname;
                }
                
                if(req.body.lastname){
                    user.lastname = req.body.lastname;
                }
                
                if(req.body.mobileno){
                    user.mobileno = req.body.mobileno;
                }

                if(req.body.emailid){
                    user.emailid = req.body.emailid;
                }

                user.save((err,user) => {
                    if(err){
                        err.statusCode = 500;
                        res.setHeader('Content-Type','application/json');
                        res.json(err);
                        return;
                    }

                    passport.authenticate('local')(req,res,()=>{
                        res.statusCode = 200;
                        res.setHeader('Content-Type','application/json');
                        res.json({success : true, status : 'User Registered Successfully !'});
                    })
                });
            }
        });

}


exports.login = (req,res) =>{
    let token = authenticate.getToken({ _id : req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json({status : true, success : 'Login Sucessfull' , token : token});
}
