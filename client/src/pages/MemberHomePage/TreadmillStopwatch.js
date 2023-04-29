import { useState, useEffect } from 'react';
import dateFormat from 'dateformat';
import './member.css';
function TreadmillStopwatch({ services, location, startTime, endTime }) {
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
    <div class="activity">
      <h3>Treadmill</h3>
      <img src='https://fitpage.in/wp-content/uploads/2021/10/Article_Banner-1-1.jpg' height="150" width="250" alt="Treadmill" />
      {/* <h4>Service: {services} at {location}</h4> */}
      {/* <h4>{dateFormat(startTime, "dddd, h:MM TT")} to {dateFormat(endTime, "dddd, h:MM TT")}</h4> */}
      <h4>Elapsed Time: {dateFormat(elapsedTime, "MM:ss")} </h4>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default TreadmillStopwatch;
