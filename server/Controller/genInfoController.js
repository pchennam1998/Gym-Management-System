const jwt = require("jsonwebtoken");
const GenInfo = require('../models/genInfoSchema');

exports.genIn = async (req,res) => {
    const {location, classDay} = req.body;
    if(!location) {
        return res.status(400).json({error: "Missing required input"});
    }

    try {
        const result = await GenInfo.findOne({location});
        if(location === result.location) {
            return res.json(result)        
        }
        //res.json({"details": result});
    } catch(e) {
        res.status(500).json({error: e.message});
    }
}
