const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, "public"))); // Serve static files (images, CSS, JS)

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "All fields are required." });
  }

  const transporter = nodemailer.createTransport({
    service: "Gmail",  // Replace with the email service you're using
    auth: {
      user: process.env.EMAIL_USER,  // From Vercel's environment variables
      pass: process.env.EMAIL_PASS,  // From Vercel's environment variables
    },
  });

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.RECEIVER_EMAIL,  // Your receiver email (from Vercel's environment variables)
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, error: "Failed to send email." });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));  // Serve the frontend HTML
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
