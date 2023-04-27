const jwt = require("jsonwebtoken");
const LoginInfo = require('../models/loginSchema');

exports.SignupInfo = async (req,res) => {

    try {
        const newuser = new LoginInfo(req.body);
        await newuser.save();
        res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating user' });
        }
}
        
    