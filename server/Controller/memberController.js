const e = require("express");
const jwt = require("jsonwebtoken");
//const MemInfo = require('../models/loginSchema');
//const LoginInfo = require('../models/loginSchema');
const MemInfo = require('../models/memberSchema');
const RegInfo = require('../models/regClassSchema');

exports.allDetails = async (req, res) => {
  try {
    const data = await RegInfo.find();

    if (data) {
      return res.json(data);
    }
    return res.json({});
  } catch (err) {
    return res.status(500).send("Server error");
  }
};

exports.getMemberSchedule = async (req, res) => {
    //console.log(await mongoose.connection.db.listCollections());
    try {
        const result = await MemInfo.find();
        res.json({"details": result});
    } catch(e) {
        res.status(500).json({error: e.message});
    }
    /*try {
      const reqemail = moment(req.body.email);
      const reqloc = moment(req.body.location);

      console.log(reqemail)
      console.log(reqloc)

      const data = await MemInfo.find({
        email: reqemail,
        reqloc: reqloc,
      });
  
      if (data) {
        return res.json({});
      }
    } catch (error) {
      return res.status(500).send("Server error");
    }
    try {
        const {emailAddress,location} = req.body;
        console.log(emailAddress)
        console.log(location)
        if(! (emailAddress && location)) {
            return res.status(200).send("All inputs are required");
        }
        const user = await MemInfo.findOne({emailAddress})
        console.log(user)
        if(location == user.location){
            return res.json({'email': emailAddress});
           }
        return res.status(200).send("Incorrect Data")

        }
    catch(err) {
        console.log(err)
        return res.status(500).send("Server error")
    }*/
  };
