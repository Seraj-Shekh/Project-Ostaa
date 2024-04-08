const express = require('express');
const router = express.Router();
const { register } = require('../controllers/auth-controller');

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/users/login', (req, res) => {
    res.render('login.ejs');
})

router.post('/users/login', (req, res) => {
    res.redirect('/');
}
)


router.get('/users/register', (req, res) => {
    res.render('register');
})

router.post('/users/register', register)

module.exports = router;
