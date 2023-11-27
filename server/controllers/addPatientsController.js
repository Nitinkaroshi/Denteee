const express = require('express');
const Billing = require('../models/addPatientsModel');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (_req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

// Get all billing records
exports.getAllBillingRecords = async (req, res) => {
    try {
        const data = await Billing.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a billing record by ID
exports.getBillingRecordById = async (req, res) => {
    try {
        const data = await Billing.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ error: 'Record not found' });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a billing record by ID
exports.deleteBillingRecordById = async (req, res) => {
    try {
        const deletedRecord = await Billing.findByIdAndDelete(req.params.id);
        if (!deletedRecord) {
            return res.status(404).json({ error: 'Record not found' });
        }
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Add a billing record
exports.addBillingRecord = async (req, res) => {
    try {
        const billingData = req.body;
        billingData.imagePath = req.file ? req.file.path : '';

        const newBillingRecord = new Billing(billingData);
        await newBillingRecord.save();
        res.json({ message: 'Billing record created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Serve uploaded images
exports.serveImages = express.static(path.join(__dirname, 'uploads'));
exports.upload = upload; // Add this line to export the multer upload object
