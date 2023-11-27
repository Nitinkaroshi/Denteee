const express = require('express');
const router = express.Router();
const voucherController = require('../controllers/vocherController');

// Create a new voucher
router.post('/vouchers', voucherController.createVoucher);

// Get all vouchers
router.get('/vouchers', voucherController.getAllVouchers);

module.exports = router;
