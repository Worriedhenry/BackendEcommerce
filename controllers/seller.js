var express = require('express');
var app = express();
const Seller = require('../models/seller');
const ProductSchema=require("../models/Product")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const CookieParser=require("cookie-parser")


app.get("/admin/info/:SellerId",async (req,res)=>{
    try{
        let result=await Seller.findById(req.params.SellerId)
        if (result) {
            res.send(result)
        } else {
            res.send({})
        }
    }catch(err){
        console.log(err)
    }
})

app.post("/seller/new",async (req,res)=>{
    try{
    
    const {PhoneNumber,FirstName,LastName,Email,GSTIN,Password,StoreName,StoreLocation}=req.body;
    let seller=await Seller.findOne({PhoneNumber:req.body.PhoneNumber})
    console.log(seller)
        if(!seller){
            bcrypt.hash(Password,12)
            .then((hashedpassword)=>{
                const NewSeller=new Seller({PhoneNumber,FirstName,LastName,Email,GSTIN,Password:hashedpassword,StoreName,StoreLocation})
                NewSeller.save()
                .then(newseller=>{
                    const token=jwt.sign({_id:NewSeller._id},process.env.JWT_KEY);
                    res.status(200).send({id:newseller._id,token})
                })
                .catch((err)=>{
                    console.log("Error h bro " , err);
                })
            })

        }
        else{
            return res.status(202).send("Already Registered")
        }
    }catch(e){
        console.log(e)
        res.status(200).send("An Error Occurred")
    }
    
})
app.get("/seller/getproduct/:ProductId",async (req,res)=>{
    try{
    let Product=await ProductSchema.findById(req.params.ProductId)
    res.status(200).send(Product)
    }catch(err){
        console.log(err)
        res.send(err).status(500)
    }

})
app.get("/admin/info", async (req,res)=>{
    try {
        console.log(` Cookie is ${req.cookies.jwt} `);

        let Result=await Seller.find()
        res.status(200).send(Result)
    } catch (error) {
        console.log(error)
        res.status(500)
    }

})



app.post( "/seller/login",async (req, res) => {
    try {
        const {PhoneNumber,Password}=req.body

        let user=await Seller.findOne({PhoneNumber:PhoneNumber})
        console.log(user,PhoneNumber,"Hi")
        if(user){
            bcrypt.compare(Password,user.Password)
            .then((ismatched)=>{
                if(ismatched){
                    const token=jwt.sign({_id:user._id},process.env.JWT_KEY);
                    res.cookie("jwt",token );
                    
                    return res.send({sellerId:user._id,token})
                }
                else{
                    return res.status(202).json({message:"Phone or Password is incorrect"})
                }
            })
        }
        else{
            return res.status(400).json({message:"Please register first"})
        }
        
    } catch (error) {
        console.log(error)
    }

})

app.post("/admin/updateSellerEmail/:SellerId",async (req,res)=>{
    try {
        const {Email}=req.body
        let result=await Seller.updateOne({_id:req.params.SellerId},{$set:{Email}})
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        res.send(error).status(500)
    }
})

app.put("/admin/updateSellerName/:SellerId",async (req,res)=>{
    try {
        const {FirstName,LastName}=req.body
        let result=await Seller.updateOne({_id:req.params.SellerId},{$set:{FirstName,LastName}})
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        res.send(error).status(500)
    }
})

app.put("/admin/updateSellerPhone/:SellerId",async (req,res)=>{
    try {
        const {PhoneNumber}=req.body
        let result=await Seller.updateOne({_id:req.params.SellerId},{$set:{PhoneNumber}})
        res.send(result)
    } catch (error) {
        console.log(error)
        res.send(error).status(500)
    }
})


app.put("/admin/updateStoreName/:SellerId",async (req,res)=>{
    try {
        const {StoreName}=req.body
        let result=await Seller.updateOne({_id:req.params.SellerId},{$set:{StoreName}})
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        res.send(error).status(500)
    }
})


app.put("/admin/updateStoreLocation/:SellerId",async (req,res)=>{
    try {
        const {StoreLocation}=req.body
        let result=await Seller.updateOne({_id:req.params.SellerId},{$set:{StoreLocation}})
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        res.send(error).status(500)
    }
})

module.exports=app 