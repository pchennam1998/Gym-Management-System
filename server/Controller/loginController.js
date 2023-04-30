const jwt = require("jsonwebtoken");
const LoginInfo = require('../models/loginSchema');

exports.logIn = async (req,res) => {

    try {
        const {emailAddress,password,type} = req.body;
        console.log(emailAddress)
        console.log(password)
        if(! (emailAddress && password)) {
            return res.status(200).send("All inputs are required");
        }
        const user = await LoginInfo.findOne({emailAddress})
        console.log(user)
        if(password == user.password){
            return res.json({'login':'successful', 'type':user.type})
        }
        return res.status(200).send("Incorrect Details")

        }
    catch(err) {
        console.log(err)
        return res.status(500).send("Server error")
    }
}
