var express = require('express');
var app = express();
require('dotenv').config()
var User=require("../models/buyer")
const jwt=require("jsonwebtoken")
app.get("/account/getuserInfo/:UserId",async (req,res)=>{
    try{
        let result=await User.findById(req.params.UserId)
        if (result) {
            res.send(result)
        } else {
            res.send({})
        }
    }catch(err){
        console.log(err)
    }
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