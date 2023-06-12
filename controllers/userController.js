const Buyer=require("../models/buyer")
const jwt = require('jsonwebtoken');
module.exports.home=function(req,res){
    res.render("home",{title:"home"})    

}
module.exports.get =function(req,res){
    res.send("working")
}
module.exports.register=async function(req,res){
    try{
    let user=await Buyer.findOne({Phone:req.body.Phone})

        if( !user){
            try{
            console.log(req.body)
            let user= await Buyer.create(req.body)
            console.log("Success")
            return res.status(200).send("New user Registered");

            }catch(err){
                console.log("error h bro ",err)
            }
        }
        else{
            return res.send(" This phone no. is already registered");
        }
    }catch(err){
        console.log("Error in registering" ,err)
    }


}

module.exports.login=async function(req,res){
    try{
    let user=await Buyer.findOne({Phone:req.body.Phone})
        if(user){
            if(user.Password != req.body.Password){
                return res.send(user)
            }
        }
        else{
            return res.redirect("back")
        }
    }catch(err){
        console.log("error in login" ,err)
    }
}


module.exports.getprofile = async function(req,res){
    try{
    let user=await Buyer.findById(req.user.id)
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