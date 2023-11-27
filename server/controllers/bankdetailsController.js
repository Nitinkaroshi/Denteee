const BankDeposit = require('../models/bankdetailsModel');

// Create a new bank deposit
exports.createBankDeposit = async (req, res) => {
    try {
        const bankDepositData = req.body;
        const bankDeposit = new BankDeposit(bankDepositData);
        await bankDeposit.save();
        res.status(201).json(bankDeposit);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Retrieve all bank deposits with search
exports.getAllBankDeposits = async (req, res) => {
    try {
        let bankDeposits = await BankDeposit.find();
        const searchKeyword = req.query.search ? req.query.search.toLowerCase() : '';

        if (searchKeyword) {
            bankDeposits = bankDeposits.filter((bd) => {
                const transactionIdMatch = bd.transactionId.toLowerCase().includes(searchKeyword);
                const otherMatches =
                    bd.id.toLowerCase().includes(searchKeyword) ||
                    bd.date.toLowerCase().includes(searchKeyword) ||
                    bd.bankName.toLowerCase().includes(searchKeyword) ||
                    bd.branch.toLowerCase().includes(searchKeyword) ||
                    bd.accountName.toLowerCase().includes(searchKeyword) ||
                    bd.amount.toLowerCase().includes(searchKeyword);
                return transactionIdMatch || otherMatches;
            });
        }

        res.json(bankDeposits);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
