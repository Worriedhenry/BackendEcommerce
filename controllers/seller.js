var express = require('express');
var app = express();
const Seller = require('../models/seller');
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const CookieParser=require("cookie-parser")
const auth=require("../middleware/AuthForSeller")

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

app.post("/admin/register",async (req,res)=>{
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
    
})

app.get("/admin/info", auth,async (req,res)=>{
    try {
        console.log(` Cookie is ${req.cookies.jwt} `);

        let Result=await Seller.find()
        res.status(200).send(Result)
    } catch (error) {
        console.log(error)
        res.status(500)
    }

})
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

}

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