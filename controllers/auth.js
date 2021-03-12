const jwt = require('jsonwebtoken');    //to generate signed token
const expressJwt = require('express-jwt');  //used for authorization check

// exports.sayHi = (req, res) => {
//     res.json({message: 'hello there'});
// };

const User = require('../models/user');
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.signup = (req, res) => {
    console.log("req.body", req.body);
    const user = new User(req.body); //you won't get anything if you don't have the body paresr installed
    user.save((err, user) => {
        if(err) {
            return res.status(400).json({
                err: errorHandler(err)
            });
        }
        //hide salt and hash password
        // user.salt = undefined;
        // user.hashed_password = undefined;
        res.json({
            user
        });
    });
};

exports.signin = (req, res) => {
    //find the user based on email
    const {email, password} = req.body;
    User.findOne({email}, (err, user) => {
        if(err || !user) {
            return res.status(400).json({
                err: 'User does not exist.'
            })
        }
        //if user found, then make sure email and password match
        
        //create authenticate model in user model
        if(!user.authenticate(password)) {
            console.log(user);
            return res.status(401).json({
                error: 'Email and password dont match'
            });
        } 
             //Generate signed token with user id and secret
            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
            console.log(token);
            //persist the token as 't' in cooke with expirty date
            res.cookie("t", token, {expire: new Date() + 9999});
            //return response with suer and token to frontend client
            const {_id, name, email, role} = user;
            return res.json({token, user: {_id, email, name, role}});
    })
}

exports.signout = (req, res) => {
    //now just need to clear cookie
    res.clearCookie("t");
    res.json({message:"Sign out success!"});
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
  });

  exports.isAuth = (req, res, next) => {
      let user = req.profile && req.auth && req.profile._id == req.auth._id;
        if(!user) {
            return res.status(403).json({
                error: 'Access denied'
            });
        };
        next();
    };

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0) {
        return res.status(403).json({
            error: "Admin resource! Access denied"
        });
    }
    next();
};