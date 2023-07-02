const mongoose=require("mongoose")

const OrdersSchema=new  mongoose.Schema({
    CustomerId:{
        type:String,
        required:[true,"CustomerId is Required"]
    },
    Name:{
        type:String,
        reuired:[true,"Name is required"]
    },
    Phone:{
        type:Number,
        required:[true,"Phone is must"]
    },
    AlternatePhone:{
        type:Number,
    },
    OrderDestination:{
        type :String,
        required:[true,"Order Destination is Required"]
    },
    OrderStatus:{
        type:Number,
        default:1
        // 1-->'Ordered'
        // 2-->"Shipped"
        // 3-->"Out For Delivery"
        // 4-->"Order Recieved"
        // 5-->"Cancled"
        // 6-->"Returned"
    },
    OrderMRPvalue:{
        type:mongoose.Types.Decimal128,
        required:[true,"Order Value is Required"]
    },
    OrderValue:{
        type:mongoose.Types.Decimal128,
        required:[true,"Order Value is Required"],
        min:[0,"Order Value Cannot Be 0"]
    },
    Ordereditem:{
        type:String,
        required:[true,"You have to order something"]
    },
    OrderedItemImage:{
        type:String,
        required:[true,'Image needeed']
    },
    OrderedItemName:{
        type:String,
        required:[true,'Name needeed']
    }
},{timestamps:true})

const OrdersSchemaModel=mongoose.model("Orders",OrdersSchema)
module.exports = OrdersSchemaModel