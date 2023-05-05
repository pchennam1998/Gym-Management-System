import { useState, useEffect } from 'react';
import dateFormat from 'dateformat';
import './member.css';
function UseStaircase({ services, location, startTime, endTime }) {
  const [timer, setTimer] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval;
    if (timer) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - timer);
      }, 1);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleStart = () => {
    setTimer(Date.now());
  };

  const handleStop = () => {
    if (timer) {
      setElapsedTime(Date.now() - timer);
      setTimer(null);
    }
  };

  const handleReset = () => {
    setTimer(null);
    setElapsedTime(0);
  };

  return (
    <div align="center">
      <h3>Staircase</h3>
      <img src='https://www.liberty.edu/campusrec/reccenters/wp-content/uploads/sites/13/2020/04/bruno-nascimento-PHIgYUGQPvU-unsplash-1024x683.jpg' height="150" width="250" alt="StairCase" />
      {/* <h4>Service: {services} at {location}</h4> */}
      {/* <h4>{dateFormat(startTime, "dddd, h:MM TT")} to {dateFormat(endTime, "dddd, h:MM TT")}</h4> */}
      <h4>Elapsed Time: {dateFormat(elapsedTime, "MM:ss")} </h4>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default UseStaircase;
