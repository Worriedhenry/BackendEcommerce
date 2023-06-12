const mongoose=require("mongoose")

const OrdersSchema=new  mongoose.Schema({
    CustomerId:{
        type:String,
        required:[true,"CustomerId is Required"]
    },
    OrderDestination:{
        type :String,
        required:[true,"Order Destination is Required"]
    },
    OrderStatus:{
        type:String,
        default:100
        // 100-->'Ordered'
        // 300-->"On the Way"
        // 404-->"Cancled"
        // 500-->"Out For Delivery"
        // 200-->"Order Recieved"
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
        type:Array,
        required:[true,"You have to order something"]
    }
})

const OrdersSchemaModel=mongoose.model("Orders",OrdersSchema)
module.exports = OrdersSchemaModel