const Bill = require('../models/addPaymentModels');

// Create a new bill
exports.createBill = async (req, res) => {
    try {
        const newBill = new Bill(req.body);
        await newBill.save();
        res.status(201).json(newBill);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all bills
exports.getAllBills = async (req, res) => {
    try {
        const bills = await Bill.find();
        res.json(bills);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
