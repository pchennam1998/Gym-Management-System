const jwt = require("jsonwebtoken");
const GenInfo = require('../models/genInfoSchema'); 

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