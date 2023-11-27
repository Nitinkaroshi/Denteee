// controllers/billController.js
const Bill = require('../models/billModel'); // Assuming you have a Bill model

// Controller to create a new bill
exports.createBill = async (req, res) => {
  try {
    const newBill = new Bill(req.body);
    await newBill.save();
    res.status(201).json(newBill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to get all bills
exports.getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find();
    res.json(bills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
