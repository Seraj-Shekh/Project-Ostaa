const express = require('express');
const router = express.Router();
const pool = require('../helpers/db.js'); // Assuming you have a database connection pool

// Route to fetch all products
router.get('/', async (req, res) => {
    try {
        const products = await pool.query('SELECT * FROM products');
        res.json(products.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/mycart', (req, res) => {
    const cart = JSON.parse(req.query.cart );
    res.render('mycart', { cart });
});

router.get('/mywishlist', (req, res) => {
    const wishlist = JSON.parse(req.query.wishlist || '[]');
    res.render('mywishlist', { wishlist });
});

router.get('/aboutUs', (req, res) => {
    res.render('aboutUs');
})

router.get('/contactUs', (req, res) => {
    res.render('contactUs');
})
router.get('/blog', (req, res) => {
    res.render('blog');
})

module.exports = router;