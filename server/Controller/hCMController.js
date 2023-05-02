const jwt = require("jsonwebtoken");
const HCMInfo = require('../models/genInfoSchema'); 
const RegInfo = require('../models/regClassSchema');
const LoginInfo = require('../models/loginSchema');

exports.getServiceDetails = async (req, res) => {

    try{
        //resExercise = req.body.services
        //resDetails = req.body.details
        //type = req.body.type
        resLocation = req.body.location

        const allData = await HCMInfo.find()

        while(allData.location == resLocation) {
            Exercise = allData.services
            Details = allData.details
          }

        if(allData == 'server error'){
            return res.status(500).send("Server error")
        }
        return res.json(Exercise, Details)
        
    }
    catch(err){
        return res.status(500).send("Server error")
    }
}

exports.putEnrollDetails = async (req, res) => {

    const { emailAddress, service, location, startDate, endDate } = req.body;

    try{   
            const enrollData = new RegInfo({
              emailAddress,
              service,
              location,
              startDate,
              endDate,
            });
        
            await enrollData.save();
            res.status(201).send(enrollData);
          } catch (error) {
            console.error(error);
            res.status(500).send(error);
          };
}

exports.putEnrollType = async (req, res) => {
    try {

        const emailAddress = req.params.emailAddress;
        const newType = 'M';
        console.log(emailAddress);
        console.log(newType);

        const changetype = await LoginInfo.findOneAndUpdate(
          { emailAddress: emailAddress },
          { $set: { type: newType } },
          { new: true }
        );
        res.json(changetype);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
}