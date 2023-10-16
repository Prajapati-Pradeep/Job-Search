const express = require('express');
const app = express();
const router = express.Router();
const nodemailer = require('nodemailer');
const multer = require('multer');
const bodyParser = require('body-parser');


const storage = multer.memoryStorage(); // You can specify a destination folder if needed
const upload = multer({ storage: storage });

app.use(bodyParser.json({ limit: '2mb' })); // Set the limit to a suitable value
app.use(bodyParser.urlencoded({ limit: '2mb', extended: true })); 


// Define an email sending route
router.post('/job-apply', upload.single('attachment'), (req, res) => {
  const attachment = req.file;  const transporter = nodemailer.createTransport({
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
    to: 'career.hrpriya@gmail.com',
    subject: 'Job Application by ' + req.body.name +" (" + req.body.email + ")",
    text: req.body.message,
    attachments: [
      {
        filename: attachment.originalname,
        content: attachment.buffer, // Send the file directly from memory
      },
    ],
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