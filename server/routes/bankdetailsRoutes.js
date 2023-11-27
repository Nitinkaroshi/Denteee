const express = require('express');
const router = express.Router();
const bankDepositController = require('../controllers/bankdetailsController');

// Create a new bank deposit
router.post('/bankdeposits', bankDepositController.createBankDeposit);

// Retrieve all bank deposits with search
router.get('/bankdeposits', bankDepositController.getAllBankDeposits);

module.exports = router;


