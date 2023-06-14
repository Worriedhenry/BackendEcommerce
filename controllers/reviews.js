var express = require('express');
var app = express();
require('dotenv').config()
const Review=require("../models/reviews")
const ProductSchema=require("../models/Product")

app.get("/review/getreview/:ProductId",async (req,res)=>{
    try {
        let ProductReviews=await ProductSchema.findById(req.params.ProductId,{reviews:1,_id:0})
        let Reviews=await ProductReviews.find({$in:{_id:ProductReviews.reviews}})
        res.send("ok")
    } catch (error) {
        
    }
})

app.post("/review/addNew/:ProductId",async (req,res)=>{
    try {
        const Body=req.body
        const productId=req.params.ProductId
        const NewReview=new Review({
            Body,productId,CustomerId:"6481efb232b997a8f8af8f67"
        })
        let result =await NewReview.save()
        let AddReviewToProduct=await ProductSchema.updateOne({_id:productId},{$push:{reviews:result._id}})
        res.send(AddReviewToProduct)

    } catch (error) {
        console.log(error);
    }
})

app.delete('/review/delete/:ProductId/:ReviewId',async (req, res) => {
    try{
    let result=await Review.deleteOne({_id:req.params.ReviewId})
    let RemoveReviewFromProduct=await ProductSchema.updateOne({_id:req.params.ProductId},{$pull:{reviews:req.params.ReviewId}})
    res.send(result)
    }catch(err){
        console.log(err);
    }
});

module.exports=app