const jwt=require("jsonwebtoken")
const Buyer=require("../models/buyer")
const Seller=require("../models/seller")

const TokenToUser=(req,res)=>{

    const token= req.cookies.jwt;
    jwt.verify(token ,process.env.JWT_KEY, async (err,payload)=>{
        if(err){
            return res.status(401).json({message:"You are not authorized"})
        }
        const {_id}=payload;
        return res.json({message:_id});

    })
}
module.exports=TokenToUser;
