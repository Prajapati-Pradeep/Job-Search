const express = require('express');
const app = express();
const port = 3005;

app.use(express.json());

// Import the mail service module
const mailService = require('./services/mailservice');

// Define an endpoint to send an email
app.post('/send-email', async (req, res) => {
  const { from, to, subject, text, attachment } = req.body;

  try {
    // Call the sendMail function from the mail service module
    const result = await mailService.sendMail(from, to, subject, text, attachment);

    res.status(200).json({ message: 'Email sent successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Email sending failed', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});