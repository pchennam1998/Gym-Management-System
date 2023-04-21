const express = require("express");
const router = express.Router();

//const flightScheduleControllers = require("../controller/flightScheduleController");

const loginController = require("../controller/loginController");

const genInfoController = require("../controller/genInfoController");

//const availableGates = require("../controller/occupiedGatesBeltsController");

//const gateStateController = require("../controller/gateStateController");


//Flight Schedule API (GETDetails, Push and Update, Get Hourly Based)

router.get("/", function(req,res){
    return res.status(200).json("Successfully Loaded");
});

//router.post("/all/flightScheduleDetails",flightScheduleControllers.getFlightSchedule);

//router.post("/all/pushScheduledFlights",flightScheduleControllers.pushNewScheduleFlights);

//router.post("/all/updateflightScheduleGate",flightScheduleControllers.updateFlightSchedule);

//router.post("/all/flightScheduleHourly", flightScheduleControllers.getFlightScheduleHourly);

//router.post("/all/DeleteScheduleFlights",flightScheduleControllers.DeleteScheduleFlights);


//Login Authentication API
router.post("/all/login", loginController.logIn);
router.post("/all/genInfo", genInfoController.genIn);


//Get Available Gates and Belts API
/*router.post("/all/availableGatesBelts", availableGates.getAvailableGatesBelts);


router.post("/all/getairlineflights", flightScheduleControllers.getAirlineFlights)

router.get("/all/allGateStatus", gateStateController.allGateStatus);

router.post("/all/updateGatestate", gateStateController.updateGateState);



router.post("/all/postData", availableGates.pushData);*/


module.exports = router;
