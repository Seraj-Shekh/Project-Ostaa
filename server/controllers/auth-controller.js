const pool = require('../helpers/db');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    try {
        // Check if all fields are filled
        if (!name || !email || !password || !confirm_password) {
            return res.status(400).json({ success: false, error: 'Please fill in all fields'});
        }

        // Check if password and confirm password match
        if (password !== confirm_password) {
            return res.status(400).json({ success: false, error: 'Passwords do not match' });
        }

        // Check if password is at least 6 characters long
        if (password.length < 6) {
            return res.status(400).json({ success: false, error: 'Password must be at least 6 characters long' });
        }

        // Check if email is valid
        if (!email.includes('@') || !email.includes('.')) {
            return res.status(400).json({ success: false, error: 'Please enter a valid email' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the database
        const newUser = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, hashedPassword]
        );
        res.redirect('login');
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    register
};
