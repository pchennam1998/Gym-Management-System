import { useState, useEffect } from 'react';
//import dateFormat from 'dateformat';
import './member.css';
import axios from "axios";

function TreadmillStopwatch({ services, location, image }) {
  const [timer, setTimer] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [record, setRecord] = useState([]);
  const [email, setEmail] = useState();
  const [stopwatchStatus, setStopwatchStatus] = useState();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const emailAddress = auth.employees[0].userName
    console.log(emailAddress);
    setEmail(emailAddress);
    axios.get(`/records?emailAddress=${emailAddress}`)
      .then(response => {
        setRecord(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    const savedTimer = localStorage.getItem("timer");
    const savedElapsedTime = localStorage.getItem("elapsedTime");
    if (savedTimer && savedElapsedTime) {
      const elapsedTime = Date.now() - parseInt(savedTimer, 10);
      setTimer(parseInt(savedTimer, 10));
      setElapsedTime(parseInt(savedElapsedTime, 10) + elapsedTime);
    }
  }, [timer]);

  const handleStart = () => {
    setStopwatchStatus("Started");
    const startTime = Date.now();
    const auth = JSON.parse(localStorage.getItem("auth"));
    const emailAddress = auth.employees[0].userName
    setTimer(startTime);
    localStorage.setItem("timer", startTime);
    const bookingData = {
      emailAddress,
      location,
      services,
      startTime
    };
    axios.post('/bookings', bookingData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleStop = () => {
    setStopwatchStatus("Stopped");
    const endTime = Date.now();
    const diff = Math.abs(endTime - timer);
    const timeInterval=Math.floor((diff/1000));
    const auth = JSON.parse(localStorage.getItem("auth"));
    const emailAddress = auth.employees[0].userName;
    console.log(timeInterval);
    console.log("$#$#$#$#")
    // setElapsedTime(timeInterval)
    
    axios.post(`/bookings/${emailAddress}`, {endTime, timeInterval})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };  

  const handleReset = () => {
    setStopwatchStatus("Reset");
    setTimer(null);
    setElapsedTime(0);
    localStorage.removeItem("timer");
    localStorage.removeItem("elapsedTime");
  };

  useEffect(() => {
    let interval;
    if (timer) {
      interval = setInterval(() => {
        //const elapsedTime = Date.now() - timer;
        setElapsedTime(prevElapsedTime => prevElapsedTime + elapsedTime);
        localStorage.setItem("elapsedTime", prevElapsedTime => prevElapsedTime + elapsedTime);
      }, 1);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div align="center">
      <h3>{services}</h3>
      <img src={image} height="150" width="250" alt="Treadmill" />
      {/* <h4>Service: {services} at {location}</h4> */}
      {/* <h4>Elapsed Time: {dateFormat(elapsedTime, "MM:ss")} </h4> */}
      <h5></h5>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
      <div>Stop Watch {stopwatchStatus}</div>
    </div>
  );
}

export default TreadmillStopwatch
