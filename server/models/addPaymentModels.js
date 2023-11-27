const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    date: Date,
    selectedValue: String,
    treatmentType: String,
    tooth: Number,
    cost: Number,
    discount: Number,
    note: String,
});

const Bill = mongoose.model('billone', billSchema);

module.exports = Bill;
