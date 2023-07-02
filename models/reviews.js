const mongoose=require("mongoose")

const ProductReview=new  mongoose.Schema({
    ProductId:{
        type:String,
        // required:[true,"Require Product Id"],
        ref:"products"
    },
    CustomerId:{
        type:String,
        default:"Ankit Sharma"
    },
    Description:{
        type :String,
    },
    Title:{
        type:String,
    },
    Rating:{
        type:mongoose.Types.Decimal128,
        // required:true
    },
},{
    timestamps:true
})

const ProductReviewModel=mongoose.model("reviews",ProductReview)
module.exports = ProductReviewModel