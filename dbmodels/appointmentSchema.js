const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    docid: { type: Schema.Types.ObjectId, ref: 'Doctor' },
    userid: { type: Schema.Types.ObjectId, ref: 'User' },
    doctorname: { type: String },
    username: { type: String },
    date: { type: Date },
    time: { type: String }, 
    timestamp: { type: Date, index: true }
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;
