var mongoose = require('mongoose');


const itemSchema = new mongoose.Schema({

    sellerId: {
        type: String,
        required: true,
        ref:"Sellers"
    },
    productId: {
        type:String,
        index:true    
    },
    catagory: {
        type:String,
        required:true,
        index:true
    },
    ProductTitle:{
        type:String,
        required:true,
        index:true,
    },
    ProductDescription:{
        type:String,
        index:true
    },
    ProductMRP:{
        type:Number,
        required:true    
    },
    ProductSellingPrice:{
        type:Number,
        required:true
    },
    ProductNumericalRating: {
        type:Number,
        default:-1,
    },
    Quantity:{
    type:Number,
    default:-1
    },
    created: {
        type:Date,
        default: Date.now
    },
    modified:
    {type:Date,
    default: Date.now
    },
    rating: Number,
    specifications: {
        type:Array
    },
    ProductImages: {
        type:Array,
        default:Array(5).fill(null)
    },
    reviews:{
        type:Array
    },
    Listed:{
        type:Boolean,
        default:false
    },
    UnitSold:{
        type:Number,
        default:0
    }

});
const Products = mongoose.model('Products', itemSchema);

module.exports = Products;