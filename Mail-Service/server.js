const express = require('express');
const app = express();
const cors = require('cors'); 
const port = 3005;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const contactRoutes = require('./services/contact');
const jobApplyRoutes = require('./services/job-apply');

app.use('/email', contactRoutes);
app.use('/sendEmail', jobApplyRoutes);

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Handle the error here or log it
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
