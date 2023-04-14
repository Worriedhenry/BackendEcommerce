var mongoose = require('mongoose');


const itemSchema = new mongoose.Schema({

    seller_id: {
        type: String,
        required: true,
        ref:"Seller"
    },
    pdt_id: String,
    catagory: {
        type:String,
        required:true    
    },
    Title:{
        type:String,
        required:true    
    },
    MRP:{
        type:Number,
        required:true    
    },
    disc_prize: Number,
    numrate: Number,
    quantity: Number,
    created: {
        type:Date,
        default: Date.now
    },
    modified:{type:Date,
    default: Date.now},
    rating: Number,
    specifications: [{
        heading: String,
        discription: String
    }],
    url: [{
        Image1: {
            type: String,
            required: true
        },
        Image2: String
    }],
    reviews: [{
        username: String,
        Head: String,
        data: String,
        rating: Number,
        created: String
    }]

}, { collection: 'fpl' });

Products = mongoose.model('Products', itemSchema);

module.exports = Products;