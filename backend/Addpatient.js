const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Import uuidv4 from uuid library

const app = express();
const port = process.env.PORT || 5002;

app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1/Addpatient', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

const BillingSchema = new mongoose.Schema({
  customerId: String, // Add this line to generate unique customer IDs
  title: String,
  firstName: String,
  lastName: String,
  date: String,
  age: String,
  gender: String,
  phoneNumber: String,
  email: String,
  case: String,
  group: String,
  language: String,
  tags: String,
  imagePath: String,
});

BillingSchema.pre('save', async function (next) {
  try {
    if (!this.customerId) {
      // Find the maximum customerId in the database
      const maxCustomerId = await Billing.findOne({}, { customerId: 1 })
        .sort({ customerId: -1 })
        .exec();


        
      // Increment the number part of the customerId
      const lastNumber = maxCustomerId ? parseInt(maxCustomerId.customerId?.substring(3)) || 0 : 0;
      const newNumber = lastNumber + 1;

      // Generate the new customerId with SAL prefix and 4 zeros followed by the incremented number
      this.customerId = `DEN${String(newNumber).padStart(4, '0')}`;
    }


    
    next();
  } catch (error) {
    next(error);
  }
});

const Billing = mongoose.model('Addpatient', BillingSchema);

app.use(bodyParser.json());

app.get('/Addpatient', async (req, res) => {
  try {
    const data = await Billing.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Fetch a billing record by ID
app.get('/Addpatient/:id', async (req, res) => {
  try {
    const data = await Billing.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Delete a billing record by ID
app.delete('/Addpatient/:id', async (req, res) => {
  try {
    const deletedRecord = await Billing.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add this endpoint to your server code
app.delete('/Addpatient/:id', async (req, res) => {
  try {
    const deletedRecord = await Billing.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Add a billing record
app.post('/Addpatient', upload.single('image'), async (req, res) => {
  try {
    const billingData = req.body;
    billingData.imagePath = req.file ? req.file.path : '';

    const newBillingRecord = new Billing(billingData);
    await newBillingRecord.save();
    res.json({ message: 'Billing record created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});