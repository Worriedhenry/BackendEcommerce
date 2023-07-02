var express = require('express');
var app = express();
require('dotenv').config()
const Review=require("../models/reviews")
const ProductSchema=require("../models/Product")
const UserSchema=require("../models/buyer")
app.get("/review/getreview/:ProductId",async (req,res)=>{
    try {
        let ProductReviews=await ProductSchema.findById(req.params.ProductId,{reviews:1,_id:0})
        let Reviews=await Review.find({_id:{$in:ProductReviews.reviews}})
        res.status(200).send(Reviews)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

app.post("/review/addNew/:ProductId",async (req,res)=>{
    try {
        const Body=req.body
        const productId=req.params.ProductId
        const isUserReviewed=await UserSchema.findById(Body.CustomerId)
        if(isUserReviewed.Reviews.includes(req.params.ProductId)){
           return res.status(202).send("You have Already Reviewed the Product")
        }
        const NewReview=new Review(
            Body
        )
        let result =await NewReview.save()
        let AddReviewToProduct=await ProductSchema.updateOne({_id:productId},{$push:{reviews:result._id}})
        const AddReviewRToUser=await UserSchema.updateOne({_id:Body.CustomerId},{$push:{Reviews:req.params.ProductId}})
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