
const express = require("express");

const connect = require("./config/db");
// const mongoose = require("mongoose");


const userController = require("./controllers/user.controller");

const productController = require("./controllers/product.controller");
const {register,login} = require("./controllers/auth.controller");
const app = express();


app.use(express.json());

// console.log("ys it is ");
app.use("/users",userController);
app.post("/register",register);
app.post("/login",login);
app.use("/products",productController);


app.listen(6334, async (req,res)=>{
    try {
        await connect();
        console.log("port is here 6334 ")
    } catch (error) {
        console.log(error.message);
    }
});