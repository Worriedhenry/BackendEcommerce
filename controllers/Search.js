var express = require('express');
var app = express.Router();
require('dotenv').config()
var Product = require("../models/Product")



app.get('/search', async (req, res) => {
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

app.get('/searchTest', async (req, res) => {
    const { query } = req.query;
    try {
        const products = await Product.find(
            {
                $or: [
                    { ProductTitle: { $regex: query, $options: 'i' } }, // Case-insensitive search on 'ProductTitle'
                    { ProductDescription: { $regex: query, $options: 'i' } }, // Case-insensitive search on 'ProductDescription'
                    { category: { $regex: query, $options: 'i' } }, // Case-insensitive search on 'category'
                ],
            }
        ).explain();

        res.json({ SearchResult: products });
    } catch (error) {
    }
});

module.exports = app;