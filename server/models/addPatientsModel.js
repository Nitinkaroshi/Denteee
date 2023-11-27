const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
    customerId: String,
    title: String,
    firstName: String,
    lastName: String,
    date: String,
    age: String,
    gender: String,
    phoneNumber: String,
    email: String,
    case: String,
    group: String,
    language: String,
    tags: String,
    imagePath: String,
});

billingSchema.pre('save', async function (next) {
    try {
        if (!this.customerId) {
            const maxCustomerId = await Billing.findOne({}, { customerId: 1 })
                .sort({ customerId: -1 })
                .exec();

            const lastNumber = maxCustomerId ? parseInt(maxCustomerId.customerId?.substring(3)) || 0 : 0;
            const newNumber = lastNumber + 1;

            this.customerId = `DEN${String(newNumber).padStart(4, '0')}`;
        }

        next();
    } catch (error) {
        next(error);
    }
});

const Billing = mongoose.model('Addpatient', billingSchema);

module.exports = Billing;
