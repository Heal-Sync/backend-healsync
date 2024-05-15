const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    type: { type: String, default: "Point" },
    coordinates: {
        type: [Number],  
        index: '2dsphere'  
    }
});

const doctorSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String },
    bio: { type: String },
    phoneNumber: { type: String },
    urls: [{ value: { type: String } }],
    username: { type: String, required: true, index: true },
    password: { type: String, required: true },
    age: { type: Number },
    dob: { type: String },
    category: { type: String },
    experience: { type: String }, 
    aadhaar: { type: String },
    clinic_location: { type: Boolean },
    home_location: { type: Boolean },
    current_location: { type: Boolean },
    detected_location: {
        type: { type: String },
        coordinates: { type: [Number] }  
    },
    location_terms: { type: Boolean },
    license: { type: String },
    medicaldegree: [{ type: String }],
    degreepdf: { type: Schema.Types.Mixed }, 
    profileImage: { type: Schema.Types.Mixed }, 
    feedback: [{
        userid: { type: Schema.Types.ObjectId, ref: 'Doctor' },
        username: { type: String },
        content: { type: String }
    }],
    chat: [{
        chatid: { type: String },
        userid: { type: Schema.Types.ObjectId, ref: 'Doctor' },
        username: { type: String },
        time: { type: Date }
    }],
    Calllog: [],
    appointment: [], 
    payment: [], 
    instantcall: [], 

    registration: { type: String },
    location: locationSchema, 
});

doctorSchema.index({ location: '2dsphere' });

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
