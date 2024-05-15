const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    id: { type: Schema.Types.ObjectId, index: true },
    payee: {
        userid: { type: Schema.Types.ObjectId, ref: 'User' },
        username: { type: String },
        profile: { type: String },
        doctorid: { type: Schema.Types.ObjectId, ref: 'Doctor' },
        doctorname: { type: String }
    },
    amount: { type: Number },
    status: { type: String },
    expire: { type: Date },
    timestamp: { type: Date, index: true }
});

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;
