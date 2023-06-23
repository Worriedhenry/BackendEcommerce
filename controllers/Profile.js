var express = require('express');
var app = express();
require('dotenv').config()
var User=require("../models/buyer")
const jwt=require("jsonwebtoken")
app.get("/account/getuserInfo/:UserId",async (req,res)=>{
    try{
        let result=await User.findById(req.params.UserId)
        console.log(result)
        if (result) {
            res.send(result)
        } else {
            res.send({})
        }
    }catch(err){
        console.log(err)
    }
})

app.post("/jwt",async (req,res)=>{
    const token= req.body.token;
    console.log(req.body)

    jwt.verify(token ,process.env.JWT_KEY, async (err,payload)=>{
        if(err){
            console.log(err)
            return res.status(204).send("--")
        }
        const {_id}=payload;
        
        return res.status(200).send({id:_id});

    })
})

app.put('/account/updateName/:UserId', async(req, res) => {
    try{
    const {FirstName,LastName,Gender}=req.body
    const result=await User.updateOne({_id:req.params.UserId},{$set:{FirstName,LastName,Gender}})
    res.status(200).send(result)
    }catch(e){
        console.log(e)
        res.status(500)
    }

});

app.put('/account/updatePhone/:UserId',async (req, res) => {
    try {
        const {Phone}=req.body
        const result=await User.updateOne({_id:req.params.UserId},{$set:{Phone}})
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.status(500).send(e)
    }
});
app.put('/account/updateEmail/:UserId',async (req, res) => {
    try {
        const {Email}=req.body
        const result=await User.updateOne({_id:req.params.UserId},{$set:{Email}})
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.status(500).send(e)
    }
});

module.exports=app