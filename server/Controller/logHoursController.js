const jwt = require("jsonwebtoken");
const GenInfo = require('../models/genInfoSchema'); 
const BookingInfo = require('../models/bookingsSchema');

exports.logInHoursMember = async (req, res) => {
    try {
        const newBooking = new BookingInfo({
          email: req.body.email,
          service: req.body.service,
          location: req.body.location,
          startTime: req.body.startTime
        });
        console.log(req.body);
    
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
        res.status(500).send('Saved successfully');
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
}

exports.logOutHoursMember = async (req, res) => {

    const { emailAddress } = req.params;
    const { endTime, timeInterval } = req.body;
  
    try {
      const booking = await BookingInfo.findOneAndUpdate(
        { emailAddress, endTime: { $exists: false } },
        { 
            endTime, 
            timeInterval: msToTime(endTime - req.body.startTime) 
        },
        { new: true }
      );
  
      if (!booking) {
        return res.status(404).json({ msg: "Booking not found or already ended" });
      }
  
      return res.status(200).json(booking);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }

  function msToTime(duration) {
    const milliseconds = parseInt((duration % 1000) / 100);
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    const days = Math.floor(duration / (1000 * 60 * 60 * 24));
  
    let result = "";
    if (days > 0) result += days + "d ";
    if (hours > 0) result += hours + "h ";
    if (minutes > 0) result += minutes + "m ";
    if (seconds > 0) result += seconds + ".";
    if (milliseconds > 0) result += milliseconds;
    return result;
  }

exports.storeLogHours = async (req, res) => {

        emailAddress = req.body.emailAddress;
        services = req.body.services;
        location = req.body.location;
        startTime = req.body.startTime;
        endTime = req.body.endTime;
        timeInterval = req.body.timeInterval;

        console.log(req.body);

        //const { emailAddress, services, location, startTime, endTime, timeInterval} = req.body;

        try {
            const newBooking = new BookingInfo({
              emailAddress,
              services,
              location,
              startTime,
              endTime,
              timeInterval
            });
        
            await newBooking.save();
        
            res.status(201).json({ message: 'Booking created successfully' });
          }
        catch(err){
        console.error(err.message);
        return res.status(500).send("Server error")
    }
}

exports.getBookings = async(req, res) => {
  try {
    const bookings = await BookingInfo.find({ emailAddress: req.params.emailAddress });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}