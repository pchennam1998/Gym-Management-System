const jwt = require("jsonwebtoken");
const GenInfo = require('../models/genInfoSchema');

exports.genIn = async (req,res) => {

    try {
        const location = req.body.location;
        const service = req.body.services;
        const classday = req.body.classday;
        const start = req.body.startTime;
        const end = req.body.endTime;
        const price = req.body.pricing;

        console.log(location)
        if(! (location)) {
            return res.status(200).send("Please select the location to view the results");
        }
        //const user = await userModel.findOne({emailAddress})
        //console.log(user)
        if(location == "San Jose Downtown"){
            console.log(service)
            return res.json({'services':service})
        }
        else if (location == "Santa Clara"){
            console.log(service)
            return res.json({'location':location})
        }
        return res.status(200).send("Incorrect Details")

        }
    catch(err) {
        console.log(err)
        return res.status(500).send("Server error")
    }
}
