var express = require('express');
var app = express.Router();
require('dotenv').config()
var Product = require("../models/Product")
var SellerSchema=require("../models/seller");
const Seller = require('../models/seller');
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const CookieParser=require("cookie-parser")
module.exports.Register= async (req,res)=>{
    try{
    
    const {PhoneNumber,FirstName,LastName,Email,GSTIN,Password,StoreName,StoreLocation}=req.body;
    let seller=await Seller.findOne({PhoneNumber:req.body.PhoneNumber})
        if(!seller){

            bcrypt.hash(Password,12)
            .then((hashedpassword)=>{
                const NewSeller=new SellerSchema({
                    PhoneNumber,FirstName,LastName,Email,Password : hashedpassword,GSTIN,StoreLocation,StoreName
                })
                NewSeller.save()
                .then(newseller=>{
                    res.status(200).json({message:"Yup you are ready to sell"})
                })
                .catch((err)=>{
                    console.log("Error h bro " , err);
                })
            })

        }
        else{
            return res.json({message:"This is already registered"})
        }
    }catch(e){
        console.log(e)
        res.status(500)
    }
    
}

app.get("/admin/info", async (req,res)=>{
    try {
        console.log(` Cookie is ${req.cookies.jwt} `);

        let Result=await Seller.find()
        res.status(200).send(Result)
    } catch (error) {
        console.log(error)
        res.status(500)
    }

},
module.exports.Login=async (req, res) => {
    try {
        const {PhoneNumber,Password}=req.body
        let user=await Seller.findOne({PhoneNumber:PhoneNumber})
        if(user){
            bcrypt.compare(req.body.Password,user.Password)
            .then((ismatched)=>{
                if(ismatched){
                    const token=jwt.sign({_id:user._id},process.env.JWT_KEY);
                    res.cookie("jwt",token );
                    
                    return res.json(token)
                }
                else{
                    return res.status(404).json({message:"Phone or Password is incorrect"})
                }
            })
        }
        else{
            return res.json({message:"Please register first"})
        }
        
    } catch (error) {
        console.log(error)
    }

});
module.exports=app
