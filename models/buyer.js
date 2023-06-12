const mongoose=require("mongoose")

const buyer_Schema=new mongoose.Schema({
    Phone:{
        type:String,
        unique:true
    },
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
    },
    Gender:{
        type:String,
    },
    Email:{
        type:String
    },
    Password:{
        type:String,
    },
    Cart:{
        type:Array,
        default:[]
    }
})
const Buyer=mongoose.model("Buyer",buyer_Schema);
module.exports=Buyer;