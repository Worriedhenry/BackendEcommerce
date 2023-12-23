const mongoose=require("mongoose")

const buyer_Schema=new mongoose.Schema({
    Phone:{
        type:String,
        unique:true
    },
    FirstName:{
        type:String,
        default:"untited"
    },
    LastName:{
        type:String,
        default:"untitled"
    },
    Gender:{
        type:String,
        default:"untitled"
    },
    Email:{
        type:String,
        default:"untitled"
    },
    Password:{
        type:String
    },
    Cart:{
        type:Array,
        default:[]
    },
    Orders:{
        type:Array,
        default:[]
    },
    Reviews:{
        type:Array,
        default:[]
    },
    GoogleLogin:{
        type:Boolean,
        default:false
    }
})
const Buyer=mongoose.model("users",buyer_Schema);
module.exports=Buyer;