const mongoose=require("mongoose")

const Seller_Schema=new mongoose.Schema({
    PhoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true,
    },
    StoreName:{
        type:String,
        required:true
    },
    GSTIN:{
        type:String,
        required:true,
        unique:true
    },
    StoreLocation:[
        {
            type:String,
            required:true
        }
    ],
    ProductsCatlog:[{
        type:Array,
        ref:"Products",
        default:[]
    }]
})
const Seller=mongoose.model("Seller",Seller_Schema);
module.exports=Seller;
