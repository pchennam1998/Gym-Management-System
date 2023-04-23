const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogMemHours = new Schema({
    memberId: {
        type: String,
        required: true
    },
    services: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    locationId: {
        type: String,
        required: true
    }
}, { timestamps: true });

const GenInfo = mongoose.model('LogHoursMember', LogMemHours)

module.exports = GenInfo;