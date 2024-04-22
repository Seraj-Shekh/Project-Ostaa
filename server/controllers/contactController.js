// controllers/contactController.js
const pool = require('../helpers/db'); // Update the import statement

exports.submitContactForm = async (req, res) => {
    const { name, email, contactNumber, message } = req.body;
    try {
        const result = await pool.query('INSERT INTO contact_submissions (name, email, contact_number, message) VALUES ($1, $2, $3, $4) RETURNING *', [name, email, contactNumber, message]);
        res.status(201).send("We have received your message. Thank you for contacting us.");
    } catch (error) {
        console.error('Error submitting contact form:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
