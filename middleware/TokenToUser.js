const jwt=require("jsonwebtoken")

const TokenToUser=(req,res)=>{

    const token= req.cookies.jwt;
    jwt.verify(token ,process.env.JWT_KEY, async (err,payload)=>{
        if(err){
            console.log(err)
            return res.status(204).json({message:"You are not authorized"})
        }
        const {_id}=payload;
        return res.status(200).json({message:_id});

    })
}
module.exports=TokenToUser;
