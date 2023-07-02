var express = require('express');
var app = express.Router();
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;
require('dotenv').config()
var User = require("../models/buyer")
var Product = require("../models/Product")

app.get("/getcart/:UserId", async (req, res) => {
  try {
    let productIds = await User.findOne({_id:req.params.UserId});
    productIds = productIds.Cart
    let result = await Product.find({ _id: { $in: productIds } });
    res.send(result)
  } catch (e) {
    console.log(e)
    res.send(e)
  }
})
app.put("/RemoveProductFromCart/:UserId/:productId", async (req, res) => {
  try {

    let UserToUpdate = await User.findOne({ _id:req.params.UserId })
    const UpdatedArray = UserToUpdate.Cart

    const IndexOfItem = UpdatedArray.indexOf(req.params.productId)
    UpdatedArray.splice(IndexOfItem, 1)

    let UserUpdateResponse = await User.updateOne({ _id:req.params.UserId }, { $set: { Cart: UpdatedArray } })

    let UpdatedCart = await Product.find({ _id: { $in: UpdatedArray } });
    res.send(UpdatedCart)
  } catch (e) {
    res.send(e)
    console.log(e)
  }
})
app.put("/AddProductToCart/:productId/:UserId", async (req, res) => {
  try {
    let UserToUpdate = await User.updateOne({_id: req.params.UserId }, { $push: { Cart: req.params.productId } })
    res.send(UserToUpdate)
  } catch (e) {
    console.log(e)
    res.send(e)
  }
})

module.exports = app;