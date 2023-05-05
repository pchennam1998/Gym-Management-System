import { useState, useEffect } from 'react';
import dateFormat from 'dateformat';
import './member.css';
import axios from "axios";

function TreadmillStopwatch({ services, location }) {
  const [timer, setTimer] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [record, setRecord] = useState([]);
  const [email, setEmail] = useState();

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
  }, []);

  const handleStart = () => {
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
    const endTime = Date.now();
    const timeInterval = (endTime - timer);
    const auth = JSON.parse(localStorage.getItem("auth"));
    const emailAddress = auth.employees[0].userName;
    console.log(timeInterval);
    console.log("$#$#$#$#")
    
    axios.post(`/bookings/${emailAddress}`, {endTime, timeInterval})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };  

  const handleReset = () => {
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
      <h3>Treadmill</h3>
      <img src='https://fitpage.in/wp-content/uploads/2021/10/Article_Banner-1-1.jpg' height="150" width="250" alt="Treadmill" />
      {/* <h4>Service: {services} at {location}</h4> */}
      <h4>Elapsed Time: {dateFormat(elapsedTime, "MM:ss")} </h4>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default TreadmillStopwatch
