const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Define an email sending route
router.post('/contact', (req, res) => {
  console.log(req.body)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: 'job.search.dubai.email@gmail.com',
      pass: 'ufcoobkrsemilyhg',
    },
    tls: {
      servername: "smtp.gmail.com"
    }
  });

  const mailOptions = {
    from: 'job.search.dubai.email@gmail.com',
    to: 'seniorhr.mahek@gmail.com',
    subject: req.body.subject + ' send by ' + req.body.name +" (" + req.body.email + ")",
    text: req.body.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email could not be sent: ' + error);
      res.status(500).send('Email could not be sent');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent');
    }
  });
});

module.exports = router;