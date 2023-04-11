const mongoose=require("mongoose")

const buyer_register_Schema=new mongoose.Schema({
    phone_no:{
        type:String,
        required:true,
        unique:true
    },
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
    },
    gender:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
})
const Buyer=mongoose.model("Buyer",buyer_login_Schema);
module.exports=BuyerRegister;