const jwt = require("jsonwebtoken");
const LoginInfo = require('../models/loginSchema');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

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

exports.forgotPassword = async (req,res) => {

    try {
        // Find the user by email
        const {emailAddress} = req.body;
        const user = await LoginInfo.findOne({ emailAddress });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Generate reset token
        const token = crypto.randomBytes(20).toString('hex');
    
        // Update user's reset token
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
        await user.save();
    
        // Send email with reset link
        const transporter = nodemailer.createTransport({
          // configure email transporter here
          host: "127.0.0.1",
          port: 586,
          secure: true,
          auth: {
            user: process.env.MAIL_ADDRESS,
            pass: process.env.MAIL_PWD
        },
        tls: {
            ciphers:'SSLv3'
        }
        });
    
        const mailOptions = {
          from: process.env.EMAIL_ADDRESS,
          to: user.emailAddress,
          subject: 'Reset Your Password',
          html: `
            <p>Please click the following link to reset your password:</p>
            <a href="${process.env.CLIENT_URL}/reset-password/${token}">Reset Password</a>
          `,
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Email could not be sent' });
          } else {
            console.log(`Email sent: ${info.response}`);
            return res.json({ message: 'Check your email to reset your password' });
          }
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
}

exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Find user by ID
      const user = await LoginInfo.findById(decoded.id);
  
      // Check if user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Update user's password
      user.password = hashedPassword;
      await user.save();
  
      res.json({ message: 'Password reset successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
  
  
  
  
  
  
  