const Buyer=require("../models/buyer")
const auth=require("../middleware/auth")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
module.exports.home=function(req,res){
    res.render("home",{title:"home"})    

}
module.exports.get =function(req,res){
    res.send("working")
}
module.exports.register=async function(req,res){
    const {FirstName, LastName, Email , Password ,Gender ,Cart,Phone}=req.body
    try{
        let user=await Buyer.findOne({Phone:req.body.Phone})
        if( !user){
            try{
            console.log(req.body)

            bcrypt.hash(Password,12)
            .then((hashedpassword)=>{
                const newuser=new Buyer({
                    FirstName,
                    LastName,
                    Phone,
                    Email,
                    Gender,
                    Cart,
                    Password :hashedpassword,
                })
                newuser.save()
                .then(newuser=>{
                    res.status(200).json({message:"SignUp completed"})
                })
                .catch((err)=>{
                    console.log("Error h bro " , err);
                })
            })
        }catch(e){
            console.log(de)
            }
        }
        else{
            return res.status(422).json("This number is already registered");
        }
    }catch(err){
        console.log("Error in registering" ,err)
    }


}

module.exports.login=async function(req,res){
    try{
        console.log(req.body)
    let user=await Buyer.findOne({Phone:req.body.Phone})
        if(user){
            bcrypt.compare(req.body.Password,user.Password)
            .then((ismatched)=>{
                if(ismatched){
                    const token=jwt.sign({_id:user._id},process.env.JWT_KEY);
                    console.log(token)
                    res.cookie("jwt",token)
                    res.json(token)
                }
                else{
                    return res.status(404).json({message:"Phone or Password is incorrect"})
                }
            })
        }
        else{
            return res.status(404).json({error:"please register "})
        }
    }catch(err){
        console.log("error in login" ,err)
    }
}


module.exports.getprofile = async function(req,res){
    try{
    let user=await Buyer.findById(req.user._id)
        if(user){
           return res.status(200).json({
                success: true,
                user,
            });
        }
        else{
            return res.redirect("back")
        }
    }catch(err){
        console.log("error in getting profile" ,err)
    }
}