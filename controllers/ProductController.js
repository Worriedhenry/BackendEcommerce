var express = require('express');
var app = express();
var item = require('../models/Product');
const { v4: uuidv4 } = require('uuid')
const User =require("../models/buyer")
const ReviewSchema=require("../models/reviews")
const SellerSchema=require("../models/seller")
app.post('/product/new', async function (req, res, next) {
    if (!req.body.seller_id || !req.body.name || !req.body.catagory || !req.body.price || req.body.specifications || req.body.specifications.size() < 5 || !req.body.quantity) {
        return res.send("insufficient information.");
    }
    else {

        var pdt_id = uuidv4();
        var nitem = new item({
            seller_id: "seller id",
            pdt_id: pdt_id,
            catagory: req.body.catagory,
            name: req.body.name,
            price: req.body.price,
            disc_prize: req.body.disc_prize,
            numrate: 0,
            quantity: req.body.quantity,
            created: new Date().toLocaleDateString(),
            modifie: new Date().toLocaleDateString(),
            rating: 0,
            specifications: req.body.specifications,
            reviews: []

        });

        nitem.save(async (err, data) => {
            if (err)
                console.log(err);
            else
                console.log("SUX");
        })

        res.send("success");
        return;
    }
});

app.post('/product/update', async function (req, res, next) {

    item.findOne({ pdt_id: req.body.pdt_id }, async function (err, data) {
        if (data) {
            await item.updateOne(
                { "pdt_id": req.body.pdt_id },
                {
                    $set: {
                        name: req.body.name,
                        price: req.body.price,
                        disc_prize: req.body.disc_prize,
                        quantity: req.body.quantity,
                        modifie: new Date().toLocaleDateString(),
                        rating: req.body.rating,
                        specifications: req.body.specifications
                    }
                }
            );
        }
        else {
            return res.send("item not found");
        }
    });
});


app.get('/getproduct/:productId/:UserId', async function (req, res, next) {
    try {
        let data = await item.findOne({ _id: req.params.productId })
        const seller=await SellerSchema.findById(data.sellerId)
        if(req.params.UserId=="false"){
            return res.json({data,InCart:false,Seller:seller.FirstName})
        }
        if (data && req.params.UserId) {
            const user=await User.findById(req.params.UserId)
            if (user.Cart.includes(req.params.productId)){

                return res.json({data,InCart:true,Seller:seller.FirstName})
            }

            return res.json({data,InCart:false,Seller:seller.FirstName})
        }
        else {
            return res.send("item not found");
        }
    } catch (e) {
        console.log(e)
        res.status(500).send("Internal serror error occurred")
    }
});
app.put("/product/changelisting",async (req,res)=>{
    const {productId,Listed}=req.body
    let result=await item.updateOne({_id:productId},{$set:{Listed:!Listed}})
    res.send(result)
})
app.put('/product/updateProduct/:ProductId', async (req, res) => {
    try{
    const {ProductTitle,ProductDescription,ProductMRP, ProductSellingPrice, ProductQuantity, ProductBrandName, specifications}=req.body
    let response=await item.updateOne({_id:req.params.ProductId},{$set:{ProductTitle,ProductDescription,ProductMRP,ProductBrandName,ProductSellingPrice,Quantity:ProductQuantity,specifications}})

    res.status(200).send(response)
    }catch(error){
        console.log(error);
        res.send(error).status(500)
    }

});
module.exports = app;