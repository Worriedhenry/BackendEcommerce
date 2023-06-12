const jwt=require("jsonwebtoken")
const Buyer=require("../models/buyer")
const auth=(req,res,next)=>{
    const {authorization}= req.headers ;
    if(!authorization){
        return res.status(401).json({message:"Login to view this page"})
    }
    const token= authorization.replace("Bearer ","");
    jwt.verify(token ,process.env.JWT_KEY,(err,payload)=>{
        if(err){
            return res.status(401).json({message:"You are not authorized"})
        }
        const {_id}=payload;
        Buyer.findById(_id).then((userdata)=>{
            req.user=userdata;
            next();
        })
    })
}
module.exports=auth;
