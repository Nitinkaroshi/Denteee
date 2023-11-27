const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  patientName: String,
  mobileNumber: String,
  doctorName: String,
  email: String,
  startTime: String,
  endTime: String,
  status: String,
});

const Billing = mongoose.model('Webappointment', billingSchema);

module.exports = Billing;
