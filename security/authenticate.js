const passport = require('passport');
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('../config/config');
const UserModel = require('../model/UserModel');

exports.local = passport.use(new LocalStrategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());


exports.getToken = (user) =>{
    return jwt.sign(user,config.secret,{expiresIn : 3600});
}

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secret;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload,done)=>{
        UserModel.findOne({_id : jwt_payload._id},(err,user)=>{
            if(err){
                return done(err,false);
            }else if(user){
                return done(null,user);
            }else{
                return done(null,false);
            }
        })
    }));

exports.verifyUser = passport.authenticate('jwt',{session : false});


