import { useState, useEffect } from 'react';
import dateFormat from 'dateformat';
import './member.css';
import axios from "axios";

function TreadmillStopwatch({ services, location }) {
  const [timer, setTimer] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get('/users')
      .then(response => {
        setMembers(response.data);
        console.log(response.data);
        console.log('##@@##');
        console.log(members.location);
        console.log(members.emailAddress);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleStart = () => {
    setTimer(Date.now());
  };

  const handleStop = async () => {
    if (timer) {
      console.log(services);
      console.log(location);
      console.log('******');
      console.log(members.emailAddress);
      const endTime = new Date();
      setElapsedTime(endTime - timer);
      setTimer(null);
      const startTime = new Date(endTime - elapsedTime);
      const response = await axios.post('/bookings', {
        emailAddress: members[0].emailAddress,
        //services: 'threadmill',
        location: members[0].location,
        startTime: startTime,
        endTime: endTime,
        timeInterval: dateFormat(elapsedTime, "MM:ss")
      });
      console.log(response.data);
    }
  };

  const handleReset = () => {
    setTimer(null);
    setElapsedTime(0);
  };

  useEffect(() => {
    let interval;
    if (timer) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - timer);
      }, 1);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div class="activity">
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
