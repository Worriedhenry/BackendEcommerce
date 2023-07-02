var express = require('express');
var app = express.Router();
const upload = require("./multer")
const mongoose=require("mongoose")
require('dotenv').config()
const ProductSchema=require("../models/Product")
const cloudinary=require("./cloudinary")
const Seller=

app.post('/AddProductToCatlog',async (req,res)=>{
    const ImagePublicUrl=req.body.ImagePublicID
    try{
    const NewProduct=new ProductSchema({
        _id: new mongoose.Types.ObjectId,
        sellerId:"123456",
        productId:"10056",
        catagory:"Electronics",
        ProductTitle:req.body.ProductTitle,
        ProductMRP:req.body.ProductMRP,
        ProductDescription:req.body.ProductDescription,
        ProductSellingPrice:req.body.ProductSellingPrice,
        ProductNumericalRating:3,
        ProductQuantity:req.body.ProductQuantity,
        ProductSpecification:req.body.specifications,
        ProductImages:[ImagePublicUrl[0].url,ImagePublicUrl[1].url,ImagePublicUrl[2].url,ImagePublicUrl[3].url,ImagePublicUrl[4].url],
        Listed:false,
        reviews:[]

    })
        NewProduct.save()
        console.log("success")
        return res.send("ProductAdded")
    } catch(e){
        console.log(e);
    }
    return res.status(200).send("ok")
})
app.post("/ProvideCatlog/:SellerId",async (req,res)=>{
    let Products=await ProductSchema.find({sellerId:"123456"})
    res.status(200).send({CatlogProducts:Products})
})
//Cloudinary Upload
app.post("/upload",upload.single('file'),async (req,res)=>{
    try{
        const result=await cloudinary.uploader.upload(req.file.path)
        console.log(process.env.API_SECRET)
        res.send({result:result})
    } catch(e){
        console.log(e)
    }
})
app.delete("/deleteProduct/:ProductId",async (req,res)=>{
    try{
        console.log(req.params.ProductId)
    let response=await ProductSchema.deleteOne({_id:req.params.ProductId})
    res.send("okie")
}
    catch(e){
        console.log(e)
        res.send(e)
    }
})
app.post("/deleteimage",async (req,res)=>{
    try{
        const result = await cloudinary.uploader.destroy(req.body.public_id);
        res.send({operationCode:200})
    } catch(e){
        console.log(e)
        res.send({operationCode:404})
    }
})
module.exports=app;