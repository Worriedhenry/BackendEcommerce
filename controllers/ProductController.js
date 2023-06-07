var express = require('express');
var router = express.Router();
var item = require('../models/Product');
const { v4: uuidv4 } = require('uuid')
const { parse } = require('path');

router.post('/product/new', async function (req, res, next) {
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

router.post('/product/update', async function (req, res, next) {

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

router.post('/product/rating', async function (req, res, next) {

    item.findOne({ pdt_id: req.body.pdt_id }, async function (err, data) {
        if (data) {
            var rev = data.reviews;
            var rate = (data.rating * data.numrate + req.body.rating) / (data.numrate + 1);
            var nrev = {
                username: req.body.username,
                head: req.body.head,
                data: req.body.data,
                rating: req.body.rating,
                created: new Date().toLocaleDateString()
            }

            rev.push(nrev);

            await item.updateOne(
                { "pdt_id": req.body.pdt_id },
                {
                    $set: {
                        rating: rate,
                        numrate: data.numrate + 1,
                        reviews: rev
                    }
                }
            );
        }
        else {
            return res.send("item not found");
        }
    });
});

router.get('/getproduct/:productId', async function (req, res, next) {
    try {
        let data = await item.findOne({ _id: req.params.productId })
        if (data) {
            console.log(data)
            return res.send( data);
        }
        else {
            return res.send("item not found");
        }
    } catch (e) {
        console.log(e)
        res.status(500).send("Internal serror error occurred")
    }
});

module.exports = router;