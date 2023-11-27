// routes/billRoutes.js
const express = require('express');
const router = express.Router();
const billController = require('../controllers/billController');

// Create a new bill
router.post('/bill', billController.createBill);

// Get all bills
router.get('/bill', billController.getAllBills);

module.exports = router;
