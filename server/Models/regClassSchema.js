const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegisterClasses = new Schema({
    emailAddress:{
        type: String,
        required: true,
        unique: true,
        match : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ 
    },
    service: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    weekDay: {
        type: [String],
        required: true
    }
}, { timestamps: true });

const RegInfo = mongoose.model('RegClasses', RegisterClasses)

module.exports = RegInfo;