var express = require('express');
var app = express.Router();
require('dotenv').config()
var ProductSchema = require('../models/buyer')
var OrdersSchema = require("../models/orders")
var calculateDistanceAndTime = require('../REST_APIs/DistanceMatrixAPI');

app.get("/getorders", async (req, res) => {
    try {
        let Order = await ProductSchema.findOne({ Phone: "12321" }).Order

        const origin = 'Mumbai, India';
        const destination = 'Delhi, India';
        calculateDistanceAndTime(origin, destination)
            .then(result => {
                if (result) {
                    console.log('Distance:', result.distanceText);
                    console.log('Duration:', result.durationText);
                } else {
                    console.log('Distance and time calculation failed.');
                }
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
        res.send(Order)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

module.exports=app;
