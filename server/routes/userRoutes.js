// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth-controller');
const authenticateUser = require('../middleware/authMiddleware');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/users/login', (req, res) => {
    res.render('login.ejs');
});

router.post('/users/login', login);

router.get('/users/logout', (req, res) => {
    // Clear session or JWT token
    res.redirect('/');
});

router.get('/users/register', (req, res) => {
    res.render('register');
});

router.post('/users/register', register);

module.exports = router;
