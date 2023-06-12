const mongoose=require("mongoose")

const buyer_Schema=new mongoose.Schema({
    Phone:{
        type:String,
        unique:true
    },
    FirstName:{
        type:String,
        default:""
    },
    LastName:{
        type:String,
        default:""
    },
    Gender:{
        type:String,
        default:""
    },
    Email:{
        type:String,
        default:""
    },
    Password:{
        type:String,
        required:[true,"Password is Required"]
    },
    Cart:{
        type:Array,
        default:[]
    },
    Orders:{
        type:Array,
        default:[]
    }
})
const Buyer=mongoose.model("Buyer",buyer_Schema);
module.exports=Buyer;