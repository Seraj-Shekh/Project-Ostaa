// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Handle form submission
router.post('/submit', contactController.submitContactForm);

module.exports = router;
