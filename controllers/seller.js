var express = require('express');
var app = express();
const Seller = require('../models/seller');


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

app.put("/admin/register",async (req,res)=>{
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


app.put("/admin/login",async (req, res) => {
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

app.put("/admin/updateSellerEmail/:SellerId",async (req,res)=>{
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