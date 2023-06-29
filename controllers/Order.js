var express = require('express');
var app = express.Router();
require('dotenv').config()
var ProductSchema = require('../models/buyer')
var OrdersSchema = require("../models/orders")
var UserSchema=require("../models/buyer")
var calculateDistanceAndTime = require('../REST_APIs/DistanceMatrixAPI');

app.get("/orders/get/:UserId", async (req, res) => {
    try {
        let OrdersIds = await UserSchema.findOne({_id:req.params.UserId});
        OrdersIds = OrdersIds.Orders
        console.log(OrdersIds)
        let result = await OrdersSchema.find({ _id: { $in: OrdersIds } });
        res.send(result)
      } catch (e) {
        console.log(e)
        res.send(e)
      }
})
app.post("/orders/new",async (req,res)=>{
    try{
    const {Name, Phone, CustomerId, OrderDestination, AlternatePhone, Ordereditem, OrderValue, OrderMRPvalue,OrderImages,OrderName}=req.body
    var OrderId=[]
    console.log(OrderName)
    for(let i=0;i<OrderImages.length;i++){
        const Data=new OrdersSchema({
            Name,Phone,CustomerId,OrderDestination,AlternatePhone,Ordereditem:Ordereditem[i],OrderedItemImage:OrderImages[i],OrderValue:OrderValue[i],OrderMRPvalue:OrderMRPvalue[i],OrderedItemName:OrderName[i]
            })
        let Order=await Data.save()
        console.log(Order)
        OrderId.push(Order._id)
    }
    let result=await UserSchema.updateOne({_id:req.body.CustomerId},{ $push: { Orders: { $each:OrderId}}})
    res.send("ok")
    }catch(err){
        console.log(err)
        res.send("okkk")
    }
})
app.get("/orders/getone/:OrderId",async (req,res)=>{
    try {
        let Order=await OrdersSchema.findById(req.params.OrderId)
        res.send(Order)
    } catch (error) {
        console.log(error)
        res.send(error).status(500)
    }
})

module.exports=app;
