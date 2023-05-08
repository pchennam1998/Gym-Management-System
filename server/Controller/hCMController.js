const jwt = require("jsonwebtoken");
const HCMInfo = require('../models/genInfoSchema'); 
const RegInfo = require('../models/regClassSchema');
const LoginInfo = require('../models/loginSchema');
const dayActivity = require('../models/dayActivitySchema');
// const Booking = require('../models/bookingsSchema');

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

exports.putEnrollDetails = async (req, res) => {

    const { emailAddress, service, location, startDate, endDate } = req.body;

    try{   
            const enrollData = new RegInfo({
              emailAddress,
              service,
              location,
              startDate,
              endDate,
            });
        
            await enrollData.save();
            res.status(201).send(enrollData);
          } catch (error) {
            console.error(error);
            res.status(500).send(error);
          };
}

exports.putEnrollType = async (req, res) => {
    try {

        const emailAddress = req.params.emailAddress;
        const newType = 'M';
        console.log(emailAddress);
        console.log(newType);

        const changetype = await LoginInfo.findOneAndUpdate(
          { emailAddress: emailAddress },
          { $set: { type: newType } },
          { new: true }
        );
        res.json(changetype);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
}

exports.getEnrollment = async (req, res) => {
    try {
        
        const { emailAddress, service } = req.body;
        const enrollment = await RegInfo.exists({ emailAddress, service });
        console.log(enrollment);
        console.log({emailAddress}, {service});
         if (enrollment) {
            res.status(200).json({ success: true });
        } else {
            res.status(404).json({ success: false });
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
}

exports.barChart = async(req, res) => {
  try {
    const { location } = req.body;
    const records = await RegInfo.aggregate([
      {
        $match: {
          location,
        },
      },
      {
        $group: {
          _id: '$service',
          count: { $sum: 1 },
        },
      },
    ]);
    const chartData = records.map(({ _id, count }) => ({
      label: _id,
      value: count,
    }));

    return res.json({ data: chartData });
  } catch(error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

exports.hoursChart = async(req, res) => {
  try {
    const { location } = req.body;
    const result = await dayActivity.aggregate([
      {
        $match: {
          checkOutTime: { $exists: true },
          location: location
        }
      },
      {
        $group: {
          _id: { $emailAddress },
          totalTime: {
            $sum: {
              $divide: [{ $subtract: ['$checkOutTime', '$checkInTime'] }, 1000 * 60 * 60]
            }
          }
        }
      }
    ])

    const chartData = result.map((data) => ({
      date: data._id,
      totalTime: data.totalTime.toFixed(2),
    }));

    return res.json({ chartData });
  }
  catch(error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// exports.analyticsByDate = async (req, res) => {
//   try {
//     // Aggregate pipeline to group bookings by date and count the number of enrollments
//     const enrollmentByDate = await Booking.aggregate([
//       {
//         $group: {
//           _id: { $dateToString: { format: '%Y-%m-%d', date: '$startDate' } },
//           totalEnrollments: { $sum: 1 }
//         }
//       }
//     ]);
//     res.status(200).json({
//       enrollmentByDate
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// }

// exports.analyticsByWeek = async (req, res) => {
//   try {
//     // Aggregate pipeline to group bookings by week and count the number of enrollments
//     const enrollmentByWeek = await Booking.aggregate([
//       {
//         $group: {
//           _id: { $week: '$startDate' },
//           totalEnrollments: { $sum: 1 }
//         }
//       }
//     ]);

//     res.status(200).json({
//       enrollmentByWeek
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// }

exports.hourlyChart = async (req, res) => {
  const { location, timePeriod } = req.body;

  try {
    // Get today's date and the start and end time for the day
    const today = new Date();
    const startTime = new Date(today.getFullYear(), today.getMonth(), today.getDate()-timePeriod);
    const endTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    console.log(startTime + "  -  " + endTime);

    // Query the database for day activities with the specified location and checkInTime between start and end time
    const result = await dayActivity.aggregate([
      {
        $match: {
          location,
          checkOutTime: { $gte: startTime, $lt: endTime }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$checkOutTime' } },
          totalTime: { $sum: { $divide: [{ $subtract: ['$checkOutTime', '$checkInTime'] }, 1000 * 60 * 60] } }
        }
      }
    ]);

    // Format the data for the chart
    let totalTime = 0;
    const chartData = result.map((data) => {
      totalTime += data.totalTime;
      return {
        totalTime: data.totalTime.toFixed(2),
      };
    });

    console.log(chartData);
    return res.json({ totalTime: totalTime.toFixed(2) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

exports.visitorsByHour = async (req, res) => {
  const { location, timePeriod} = req.body;
  const today = new Date();
  const dayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()-timePeriod);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  dayEnd.setHours(23, 59, 59, 999);

  console.log(dayStart + "  -  " + dayEnd + "  -  " + location + "  -  " + timePeriod);

  try {
    const activity = await dayActivity.find({
      location,
      checkInTime: { $gte: dayStart, $lte: dayEnd },
      checkOutTime: { $gte: dayStart, $lte: dayEnd },
    });
    
    const visitorsByHour = new Array(24).fill(0);

      activity.forEach((activity) => {
      const checkInHour = activity.checkInTime.getHours();
      const checkOutHour = activity.checkOutTime.getHours();
      for (let hour = checkInHour; hour <= checkOutHour; hour++) {
        visitorsByHour[hour]++;
      }
    });

    const chartData = visitorsByHour.map((visitors, hour) => ({ hour, visitors }));
    res.json(chartData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
