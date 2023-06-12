const mongoose=require("mongoose")

const ProductReview=new  mongoose.Schema({
    ProductId:{
        type:mongoose.Types.ObjectId,
        required:[true,"Require Product Id"],
        ref:"products"
    },
    CustomerId:{
        type:String,
        default:"Ankit Sharma"
    },
    ReviewDescription:{
        type :String,
    },
    ReviewTitle:{
        type:String,
    },
    Rating:{
        type:mongoose.Types.Decimal128,
        required:true
    },
    ReviewDateAndTime:{
        type:Date,
        default:Date.now()
    }
})

const ProductReviewModel=mongoose.model("reviews",ProductReview)
module.exports = ProductReviewModel