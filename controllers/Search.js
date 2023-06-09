var express = require('express');
var app = express.Router();
require('dotenv').config()
var Product = require("../models/Product")



app.get('/searchTest', async (req, res) => {
    const { query } = req.query;
    try {
        const result = await Product.find(
            { $text: { $search: query } },
            { score: { $meta: 'textScore' } }
        )
            .sort({ score: { $meta: 'textScore' } })
            .sort({ ProductTitle: -1 });

        const products = result.map((doc) => doc.ProductTitle);
        res.json({ SearchResult: result });
    } catch (error) {
        console.error('Error searching for products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        const products = await Product.find(
            {
                $and: [
                    {
                      $or: [
                        { ProductTitle: { $regex: query, $options: 'i' } },
                        { ProductDescription: { $regex: query, $options: 'i' } },
                        { category: { $regex: query, $options: 'i' } },
                      ],
                    },
                    { Listed: true }, // Filter for isListed: true
                  ],
            }
        );
            console.log(products)
        res.json({ SearchResult: products });
    } catch (error) {
    }
});

module.exports = app;