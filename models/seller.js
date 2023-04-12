const mongoose=require("mongoose")

const Seller_Schema=new mongoose.Schema({
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
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    shop_name:{
        type:String,
        required:true
    },
    gst_no:{
        type:String,
        required:true,
        unique:true
    },
    location:[
        {
            type:String,
            required:true
        }
    ],
    products_cat:[
        {
            type:String,
            required:true
        }
    ]
})
const Seller=mongoose.model("Seller",Seller_Schema);
module.exports=Seller;
