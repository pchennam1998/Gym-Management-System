const jwt = require("jsonwebtoken");
const HCMInfo = require('../models/genInfoSchema'); 

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

