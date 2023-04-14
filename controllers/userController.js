const Buyer=require("../models/buyer")

module.exports.home=function(req,res){
    
}
module.exports.get =function(req,res){
    res.send("working")
}
module.exports.register=function(req,res){
    return res.send("ok")
    Buyer.findOne({phone_no:req.body.phone_no},function(error,user){
        if(error){
            console.log("Oops ! error in registering 1");
            return ;
        }
        if( !user){
            Buyer.create(req.body,function(error,user){
                if(error){
                    console.log("Oops ! error in registering 2");
                    return ;
                }
                return res.redirect("/");

            });
        }
        else{
            return res.send(" This phone no. is already registered");
        }

    })
}

module.exports.login=function(req,res){
    Buyer.findOne({phone_no:req.body.phone_no},function(error,user){
        if(error){
            console.log("Oops ! error in SignIn");
            return ;
        }
        if(user){
            if(user.password != req.body.password){
                return res.redirect("/user/profile")
            }
        }
        else{
            return res.redirect("back")
        }
    })

}
module.exports.getprofile = function(req,res){
    
    Buyer.findById(req.user.id,function(err,user){
        if(user){
           return res.status(200).json({
                success: true,
                user,
            });
        }
        else{
            return res.redirect("back")
        }
    });
}