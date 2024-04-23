const express = require('express');
const router = express.Router();
const { register, login, forgotPassword, resetPassword } = require('../controllers/auth-controller');

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

// Forgot Password Routes
router.get('/users/forgot-password', (req, res) => {
    res.render('forgot-password');
});

router.post('/users/forgot-password', forgotPassword);

router.get('/users/reset-password/:token', (req, res) => {
    const { token } = req.params;
    res.render('reset-password', { token });
});

router.post('/users/reset-password/:token', resetPassword);

module.exports = router;
