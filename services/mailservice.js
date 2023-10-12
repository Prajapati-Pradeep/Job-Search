const nodemailer = require('nodemailer');

// Replace with your email configuration
const transporter = nodemailer.createTransport({
  service: 'your-email-service-provider', // e.g., 'Gmail'
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

// Configure Multer for handling file uploads
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Function to send an email with or without an attachment
async function sendMail(from, to, subject, text, attachment) {
  try {
    const mailOptions = {
      from,
      to,
      subject,
      text,
    };

    if (attachment) {
      mailOptions.attachments = [
        {
          filename: attachment.originalname,
          content: attachment.buffer,
        },
      ];
    }

    const info = await transporter.sendMail(mailOptions);
    return info.response;
  } catch (error) {
    throw error;
  }
}

// Export the sendMail function so that it can be used in server.js
module.exports = {
  sendMail,
};
