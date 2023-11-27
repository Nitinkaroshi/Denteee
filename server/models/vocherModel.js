const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
    receiptType: String,
    amount: Number,
    paidBy: String,
    date: Date,
    totalAmountPaid: Number,
    narration: String,
});

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;
