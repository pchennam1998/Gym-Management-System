import { useState, useEffect } from 'react';
import dateFormat from 'dateformat';
import './member.css';
function Weightlifting({ services, location, startTime, endTime }) {
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
    //   try {
    //     const response = await fetch('/api/elapsed-time', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({ elapsedTime })
    //     });
    //     if (!response.ok) {
    //       throw new Error('Failed to send elapsed time to server');
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    }
  };

  const handleReset = () => {
    setTimer(null);
    setElapsedTime(0);
  };

  return (
    <div align="center">
      <h3>Weightlifting</h3>
      <img src='https://w7.pngwing.com/pngs/365/988/png-transparent-olympic-weightlifting-computer-icons-weight-training-weightlifting-blue-angle-orange.png' height="150" width="250" alt="Weightlifting" />
      {/* <h4>Service: {services} at {location}</h4> */}
      {/* <h4>{dateFormat(startTime, "dddd, h:MM TT")} to {dateFormat(endTime, "dddd, h:MM TT")}</h4> */}
      <h4>Elapsed Time: {dateFormat(elapsedTime, "MM:ss")} </h4>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default Weightlifting;
