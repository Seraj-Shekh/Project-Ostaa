const express = require('express');
const cors = require('cors');
const path = require('path');
const userAuth = require('./routes/userRoutes'); 
const productRoutes = require('./routes/productRoutes');
const app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../public/views'));

// Load environment variables from .env file
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'))

// Routes
app.use('/', userAuth);
app.use('/products', productRoutes);

// server the static files
app.use(express.static(path.join(__dirname, '../public')));
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
