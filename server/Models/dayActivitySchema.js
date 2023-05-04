const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DayActivitySchema = new Schema({
    emailAddress:{
        type: String,
        required: true,
        match : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ 
    },
    services: {
        type: String
    },
    checkInTime: {
        type: Date,
        required: true
    },
    checkOutTime: {
        type: Date
    },
    location: {
        type: String,
        required: true
    },
    checkType: {
        type: Boolean
    }
}, { timestamps: true });

const DayActivityInfo = mongoose.model('DayActivity', DayActivitySchema)

module.exports = DayActivityInfo;