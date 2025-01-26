const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// POST route for form submission
app.post('/send-message', async (req, res) => {
    const { name, email, message } = req.body;

    // Validate input fields
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // or any other email service provider
            auth: {
                user: 'kshitijadarde@gmail.com', // Replace with your email
                pass: 'ujau vwnx ldlz fhgh', // Replace with your email password or app password
            },
        });

        // Email content
        const mailOptions = {
            from: 'kshitijadarde@gmail.com',
            to: 'kshitijadarde@gmail.com', // Where you want to receive messages
            subject: 'New Message from Contact Form',
            html: `
                <h3>Contact Form Message</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong> ${message}</p>
            `,
        };

        // Send email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Your message has been sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send your message. Please try again later.' });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
