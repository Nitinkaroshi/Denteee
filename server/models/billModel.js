// models/billModel.js
const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    date: Date,
    treatmentType: String,
    tooth: Number,
    cost: Number,
    discount: Number,
    note: String,
});

const Bill = mongoose.model('bill', billSchema);

module.exports = Bill;
