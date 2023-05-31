const mongoose=require("mongoose")

const buyer_Schema=new mongoose.Schema({
    Phone:{
        type:String,
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
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    }
})
const Buyer=mongoose.model("Buyer",buyer_Schema);
module.exports=Buyer;