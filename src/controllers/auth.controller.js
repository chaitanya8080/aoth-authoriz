
const User = require("../model/user.model");

const jwt = require("jsonwebtoken");
require('dotenv').config();
const newToken = (user)=>{
    // console.log(process.env.key);
   return jwt.sign({user}, process.env.key); //
}


const register = async (req,res)=>{
    try {
      
       let user = await User.findOne({email : req.body.email});

       if(user){
           return res.status(400).send({messege: "email already exists"})
       }
       // we are checking the email
       user = await User.create(req.body);

       const token  = newToken(user)
       return res.status(200).send({user,token});
    } catch (error) {
        res.status(400).send({messege : "Email already exist "})
    }
}


//login checking 

const login = async (req,res)=>{
    try {
       let user = await User.findOne({email : req.body.email});

       if(!user){
           return res.status(400).send({messege: "Wrong Email or password"})
       }
      
       const match = user.checkPassword(req.body.password);

       if(!match){
           return res.status(400).send("wrong email or password");
       }

       const token  = newToken(user)
       return res.status(200).send({user,token});
    
    } catch (error) {
        res.status(400).send({messege : "Email already exist "})
    }
}

module.exports = {register,login};