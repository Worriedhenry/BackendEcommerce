var express = require('express');
var app = express.Router();
require('dotenv').config()
var Product = require("../models/Product")
var SellerSchema=require("../models/seller");
const Seller = require('../models/seller');

app.post("/admin/register",async (req,res)=>{
    try{
    const {PhoneNumber,FirstName,LastName,Email,GSTIN,Password,StoreName,StoreLocation}=req.body;
    const NewSeller=new SellerSchema({
        PhoneNumber,FirstName,LastName,Email,Password,GSTIN,StoreLocation,StoreName
    })
    NewSeller.save()
    res.status(200)
    }catch(e){
        console.log(e)
        res.status(500)
    }
})

app.get("/admin/info",async (req,res)=>{
    try {
        let Result=await Seller.find()
        res.status(200).send(Result)
    } catch (error) {
        console.log(error)
        res.status(500)
    }

})
app.post("/admin/login",async (req, res) => {
    try {
        const {PhoneNumber,Password}=req.body
        let Result=await Seller.findOne({PhoneNumber:PhoneNumber})
        if (Result){
            if (Result.Password===Password) {
                return res.status(200)
            }
            res.statusCode(404)
        }
        else{
            res.status(404)
        }
        
    } catch (error) {
        console.log(error)
    }

});
module.exports=Seller