const e = require("express");
const jwt = require("jsonwebtoken");
//const MemInfo = require('../models/loginSchema');
const LoginInfo = require('../models/loginSchema');
const MemInfo = require('../models/memberSchema');
const RegInfo = require('../models/regClassSchema');
const DayActivityInfo = require('../models/dayActivitySchema');

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

/*exports.allMembers = async (req, res) => {
  try {
    const data1 = await LoginInfo.find({ type: "M" });

    if (data1) {
      return res.json(data1);
    }
    return res.json({});
  } catch (err) {
    return res.status(500).send("Server error");
  }
};*/

exports.getMemberSchedule = async (req, res) => {
    //console.log(await mongoose.connection.db.listCollections());
    try {
        const result = await MemInfo.find();
        res.json({"details": result});
    } catch(e) {
        res.status(500).json({error: e.message});
    }
  };

  exports.allNonMembers = async (req, res) => {
    try {
      const data2 = await LoginInfo.find();
      res.json(data2);
    }
    catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };

  exports.allMembers = async (req, res) => {
    try {
      const data1 = await LoginInfo.find({ type: "M" });
  
      if (data1) {
        const dayActivities = await DayActivityInfo.find();
        const dayActivityMap = {};
        dayActivities.forEach((activity) => {
          dayActivityMap[activity.emailAddress] = activity;
        });
  
        const memberList = data1.map((member) => {
          const checkInTime = dayActivityMap[member.emailAddress]
            ? dayActivityMap[member.emailAddress].checkInTime
            : null;
          const checkOutTime = dayActivityMap[member.emailAddress]
            ? dayActivityMap[member.emailAddress].checkOutTime
            : null;
  
          return {
            ...member.toObject(),
            checkInTime,
            checkOutTime,
          };
        });
  
        return res.json(memberList);
      }
  
      return res.json({});
    } catch (err) {
      return res.status(500).send("Server error");
    }
  };
  
  exports.checkIn = async (req, res) => {
    try {
      const email = req.body.emailAddress;
      const member = await LoginInfo.findOne({ emailAddress: email });
      console.log(member)
  
      if (!member || member.type !== 'M') {
        return res.status(400).json({ msg: 'Invalid member email' });
      }
  
      //const dayActivity = await DayActivityInfo.findOne({ emailAddress: email });
  
      // if (dayActivity) {
      //   return res.status(400).json({ msg: 'User already checked-in' });
      // }
  
      const newActivity = new DayActivityInfo({
        emailAddress: email,
        checkInTime: new Date(),
        location: 'San Jose Downtown',
        checkType: true
      });
  
      await newActivity.save();
      res.json({ msg: 'User checked-in successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  exports.checkOut = async (req, res) => {
    try {
      const email = req.body.emailAddress;
      const member = await LoginInfo.findOne({ emailAddress: email });
  
      if (!member || member.type !== 'M') {
        return res.status(400).json({ msg: 'Invalid member email' });
      }
  
      const dayActivity = await DayActivityInfo.findOne({ emailAddress: email, checkType: true });
  
      if (dayActivity.checkType == false) {
        return res.status(400).json({ msg: 'User has not checked-in yet' });
      }
      console.log('$#$#');
      console.log(dayActivity.checkType);
  
        dayActivity.checkOutTime = new Date();
        dayActivity.checkType = false;
        await dayActivity.save();
        res.json({ msg: 'User checked-out successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  exports.getMemberdata = async(req, res) => {
    const { emailAddress } = req.query;
    console.log(emailAddress);

      RegInfo.find({ emailAddress }, (err, records) => {

      console.log(records);
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
      } else {
        res.json(records);
      }
    });
  }
