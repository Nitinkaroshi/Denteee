const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const billRoutes = require('./routes/billRoutes');
const addPaymentRoutes = require('./routes/addPaymentRoutes');
const vocherRoutes = require('./routes/vocherRoutes');
const bankdetailsRoutes = require('./routes/bankdetailsRoutes');
const addPatientsRoutes = require('./routes/addPatientsRoutes');
const  addpatientwebRoutes = require('./routes/addpatientwebRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'Dentee';

mongoose.connect(`${uri}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });


app.use('/api', billRoutes); 
app.use('/api', addPaymentRoutes); 
app.use('/api', vocherRoutes); 
app.use('/api', bankdetailsRoutes); 
app.use('/api', addPatientsRoutes); 
app.use('/api', addpatientwebRoutes); 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
