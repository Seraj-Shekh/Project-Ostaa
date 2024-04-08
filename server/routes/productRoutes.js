const express = require('express');
const router = express.Router();



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