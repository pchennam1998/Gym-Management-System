const jwt = require("jsonwebtoken");
const GenInfo = require('../models/genInfoSchema'); 
const BookingInfo = require('../models/bookingsSchema');

exports.logInHoursMember = async (req, res) => {

    try{
        resExercise = req.body.services
        resLocation = req.body.location

        const allData = await GenInfo.find()

        while(allData.location == resLocation) {
            const dataloginHours = new GenInfo({
                services: services,
                details: details,
                classDay: classDay,
                startTime: Date.now(),
                endTime: endTime,
                pricing: pricing,
                contact: contact,
                location: location
              });
          }

        console.log(Date.now());

        if(allData == 'server error'){
            return res.status(500).send("Server error")
        }
        return res.json(allData)
        
    }
    catch(err){
        return res.status(500).send("Server error")
    }
}

exports.logOutHoursMember = async (req, res) => {

    try{
        resExercise = req.body.services
        resLocation = req.body.location


        const allData = await GenInfo.find()

        while(allData.location == resLocation) {
            const datalogoutHours = new GenInfo({
                services: services,
                details: details,
                classDay: classDay,
                startTime: startTime,
                endTime: Date.now(),
                pricing: pricing,
                contact: contact,
                location: location
              });
          }
        
        console.log(Date.now());

        if(allData == 'server error'){
            return res.status(500).send("Server error")
        }
        return res.json(allData)
        
    }
    catch(err){
        return res.status(500).send("Server error")
    }
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