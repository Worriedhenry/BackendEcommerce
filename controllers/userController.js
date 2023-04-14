const Buyer=require("../models/buyer")

module.exports.home=function(req,res){
    res.render("home",{title:"home"})    

}
module.exports.get =function(req,res){
    res.send("working")
}
module.exports.register=async function(req,res){
    return res.send("ok")
    try{
    let user=await Buyer.findOne({phone_no:req.body.phone_no})

        if( !user){
            try{
            let user= await Buyer.create(req.body)
                return res.redirect("/");

            }catch(err){
                console.log("error h bro ",err)
            }
        }
        else{
            return res.send(" This phone no. is already registered");
        }
    }catch(err){
        console.log("Erroe in registering" ,err)
    }


}

module.exports.login=async function(req,res){
    try{
    let user=await Buyer.findOne({phone_no:req.body.phone_no})
        if(user){
            if(user.password != req.body.password){
                return res.redirect("/user/profile")
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