var express = require('express');
var app = express();
require('dotenv').config()
const jwt=require("jsonwebtoken")
app.post("/jwt",async (req,res)=>{
    const token= req.body.token;
    jwt.verify(token ,process.env.JWT_KEY, async (err,payload)=>{
        if(err){
            console.log(err)
            return res.status(204).send("--")
        }
        const {_id}=payload;
        
        return res.status(200).send({id:_id});

    })
})
app.post("/sellerAuth",async (req,res)=>{
    const token=req.body.token;
    console.log(req.body.token)
    jwt.verify(token ,process.env.JWT_KEY, async (err,payload)=>{
        if(err){
            console.log(err)
            return res.status(204).send("--")
        }
        const {_id}=payload;
        
        return res.status(200).send({id:_id});

    })
})


app.get("/initialQuery",async (req,res)=>{
    return res.status(200).send({})
})


module.exports=app