
const mongoose = require('mongoose');

const bankDepositSchema = new mongoose.Schema({
    id: String,
    date: String,
    bankName: String,
    branch: String,
    accountName: String,
    transactionId: String,
    amount: String,
});

const BankDeposit = mongoose.model('BankDeposit', bankDepositSchema);

module.exports = BankDeposit;

