const Voucher = require('../models/vocherModel');

// Create a new voucher
exports.createVoucher = async (req, res) => {
    try {
        const newVoucher = new Voucher(req.body);
        await newVoucher.save();
        res.status(201).json(newVoucher);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all vouchers
exports.getAllVouchers = async (req, res) => {
    try {
        const vouchers = await Voucher.find();
        res.json(vouchers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
