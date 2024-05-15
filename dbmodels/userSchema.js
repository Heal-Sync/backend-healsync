const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true, index: true },
    pass: { type: String, required: true },
    name: { type: String, required: true},
    address: { type: String },
    age: { type: Number },
    img: { type: String },
    medicalhistory: [{
        path: { type: String },
        date: { type: Date },
        timestamp: { type: Number }
    }],
    chat: [{
        doctorid: { type: Schema.Types.ObjectId, ref: 'Doctor' },
        doctorname: { type: String },
        time: { type: Date },
        chatid: { type: String }
    }],
    appointment: [{
        doctorid: { type: Schema.Types.ObjectId, ref: 'Doctor' },
        doctorname: { type: String },
        date: { type: Date },
        appid:{ type: String }
    }],
    paymnt: [{
        payid: { type: String },
        to:  { type: Schema.Types.ObjectId, ref: 'Doctor' },
        from:  { type: Schema.Types.ObjectId, ref: 'Doctor' },
        amount: { type: Number },
        status: { type: String },
        remark: { type: String }
    }],
    instant_call: [{
        time: { type: Date },
        doctorname: { type: String },
        
    }],
    call_logs: [{
        doctorid: { type: Schema.Types.ObjectId, ref: 'Doctor' },
        doctorname: { type: String },
        userid: { type: Schema.Types.ObjectId, ref: 'Doctor' },
        time: { type: Date }
    }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
