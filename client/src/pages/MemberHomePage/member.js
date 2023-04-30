import React, { useEffect, useState } from 'react';
import axios from "axios";
import dateFormat from 'dateformat';
import TreadmillStopwatch from './TreadmillStopwatch';
import UseStaircase from './UseStaircase';
import Cycling from './Cycling';
import { useNavigate } from "react-router-dom";


function Member() {

  const navigate = useNavigate();

	const handleLogout = () => {
		console.log("Logout came")
		localStorage.removeItem('auth');
		navigate('/login');
  }

    const initialValues = []
    const [pagedata,setPagedata]=useState(initialValues);
    //const [emailAddress,setEmailaddress]=useState();
    const [services,setServices]=useState();
    const [startTime,setStarttime]=useState();
    const [endTime, setEndtime]=useState();
    const [location, setLocation]=useState();

  useEffect(() => {
    axios.get('/all/member')
    .then((response) => {
      const data = response.data.details;
      setPagedata(data);
      setServices(data[0].services);
      setStarttime(data[0].startTime);
      setEndtime(data[0].endTime);
      setLocation(data[0].location);
    })
    .catch((e) => {
      console.log("123");
      alert(e.message);
    });
  },[]);

  return (
    
    // {<TreadmillStopwatch />}
   
    <div>
    <h1>Member Dashboard</h1><br></br>
      {/* <h2>{emailAddress}</h2> */}
      <div>
      <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      <h3 color='#'>Class Schedule for a week</h3>
      <img src='https://fitpage.in/wp-content/uploads/2021/10/Article_Banner-1-1.jpg' hegiht="350" width="450"></img>
      <h4>{services} at {location}</h4>
      <h4>{dateFormat(startTime, "dddd, h:MM TT")} to {dateFormat(endTime, "dddd, h:MM TT")}</h4>
      </div>
      {/* <div class="activities">
        <div >
        <h3>Treadmill Stopwatch</h3>
        <img src='https://fitpage.in/wp-content/uploads/2021/10/Article_Banner-1-1.jpg' height="350" width="450" alt="Treadmill" />
        <h4>Elapsed Time: {elapsedTime} ms</h4>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div class="activity">
        <h3>Treadmill Stopwatch</h3>
        <img src='https://fitpage.in/wp-content/uploads/2021/10/Article_Banner-1-1.jpg' height="350" width="450" alt="Treadmill" />
        <h4>Elapsed Time: {elapsedTime} ms</h4>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div >
        <h3>Treadmill Stopwatch</h3>
        <img src='https://fitpage.in/wp-content/uploads/2021/10/Article_Banner-1-1.jpg' height="350" width="450" alt="Treadmill" />
        <h4>Elapsed Time: {elapsedTime} ms</h4>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div></div> */}
      <div class='activities'>
      <TreadmillStopwatch />
      <UseStaircase />
      <Cycling />
      </div>
    </div>

  );
}


export default Member;
