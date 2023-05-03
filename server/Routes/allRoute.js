const express = require("express");
const router = express.Router();

const loginController = require("../Controller/loginController");

const genInfoController = require("../Controller/genInfoController");

const logHoursController = require("../Controller/logHoursController");

const memberController = require("../Controller/memberController");

const signupController = require("../Controller/signupController");

const hCMController = require("../Controller/hCMController");

router.get("/", function(req,res){
    return res.status(200).json("Successfully Loaded");
});

//Login Authentication API
router.post("/all/login", loginController.logIn);

router.get("/all/genInfo", genInfoController.genIn);

router.post("/all/signup", signupController.SignupInfo);

router.get("/all/member", memberController.getMemberSchedule);

router.get("/all/details", memberController.allDetails);

router.get("/users", memberController.allMembers);

router.get("/nonusers", memberController.allNonMembers);

router.post("/checkin", memberController.checkIn);

router.post("/checkout", memberController.checkOut);

router.post("/all/logInHours", logHoursController.logInHoursMember);

router.post("/all/enroll", hCMController.putEnrollDetails);

router.post("/updatetype/:emailAddress", hCMController.putEnrollType);

router.post("/forgot-password", loginController.forgotPassword);

router.post("/reset-password/:token", loginController.resetPassword);

router.post("/enrollments", hCMController.getEnrollment);

router.post("/bookings", logHoursController.storeLogHours);

router.get("/records", memberController.getMemberdata);

module.exports = router;
