const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    services: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    location: {
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
    }
}, { timestamps: true });

const BookingInfo = mongoose.model('Bookings', BookingSchema)

module.exports = BookingInfo;