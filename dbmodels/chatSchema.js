const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    username: { type: String },
    userid: { type: Schema.Types.ObjectId, ref: 'User' },
    doctorname: { type: String },
    doctorid: { type: Schema.Types.ObjectId, ref: 'Doctor' },
    content: { type: String },
    file: [{
        who: { type: String },
        prescription: { type: String },
        path: { type: String }
    }],
    timestamp: { type: Date, index: true }
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
