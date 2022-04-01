

const express = require("express");

const Product = require("../model/product.model");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.post("", authenticate , async ( req,res)=>{


    req.body.user_id = req.userID;
    try {
        const product = await Product.create(req.body);

        return res.status(200).send(product);
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})

router.get("", async (req, res) => {
    try{
        const product = await Product.find()
        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
})

router.get("/:id", async (req, res) => {
    req.body.user_id = req.userID;
    try{
        const product = await Product.findById(req.params.id).lean().exec();
        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
})


router.patch("/:id",authenticate, async (req,res)=>{
    req.body.user_id = req.userID;
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body,{new:true}).lean().exec();
        return res.status(200).send(product);
    } catch (err) {
        res.status(400).send({message:err.message});
    }
})

router.delete("/:id",authenticate, async (req,res)=>{
    req.body.user_id = req.userID;
    try {
        const product = await Product.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(product);
    } catch (err) {
        res.status(400).send({message:err.message});
    }
})

module.exports = router;