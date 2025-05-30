const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("."));

require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

transporter.verify(function(error, success) {
  if (error) {
    console.log("SMTP Connection Error:", error);
  } else {
    console.log("SMTP Server is ready to take our messages");
  }
});

// API endpoint for form submission
app.post("/api/submit-application", async (req, res) => {
  try {
    const { name, email, phone, paypal, why } = req.body;

    const mailOptions = {
      from: `MrBeast Challenge <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "MrBeast $1,000,000 Challenge Application Received",
      text: `Dear ${name},\n\nThank you for applying...`,
      html: `<div>...</div>`
    };

    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${email}`);

    res.status(200).json({
      success: true,
      message: "Application submitted successfully"
    });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit application"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
