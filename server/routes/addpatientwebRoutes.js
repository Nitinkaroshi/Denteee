const express = require('express');
const router = express.Router();
const webAppointmentController = require('../controllers/appointmentwebController');

// Fetch all billing data
router.get('/Webappointment', webAppointmentController.getAllBillingData);

// Delete a billing record by ID
router.delete('/Webappointment/:id', webAppointmentController.deleteBillingRecordById);

// Add a billing record
router.post('/Webappointment', webAppointmentController.addBillingRecord);

module.exports = router;
