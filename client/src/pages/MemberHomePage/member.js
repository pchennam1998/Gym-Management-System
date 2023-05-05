import React, { useEffect, useState } from 'react';
import axios from "axios";
import dateFormat from 'dateformat';
import TreadmillStopwatch from './TreadmillStopwatch';
import UseStaircase from './UseStaircase';
import Weightlifting from './Weightlifting';
import { useNavigate } from "react-router-dom";

function Member(props) {

  const [record, setRecord] = useState(null);
  const navigate = useNavigate();

	const handleLogout = () => {
		console.log("Logout came")
		localStorage.removeItem('auth');
    props.callBackHandler()
		navigate('/login');
  }

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const emailAddress = auth.employees[0].userName
    console.log(emailAddress);
    axios.get(`/records?emailAddress=${emailAddress}`)
      .then(response => {
        setRecord(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

    if (!record) {
      return <div className="message-display"><br></br><br></br>
      <button className="btn btn-danger" style={{float: 'right'}} onClick={handleLogout}>Logout</button>
      <b>You're not enrolled into any type of service. Request your <b>Health Club Employee</b> to get registered for any of the plan</b><br></br>
    </div>;
    }

  return (
    
    // {<TreadmillStopwatch />}
   
    <div>
     {/* <h2>{emailAddress}</h2> */}
      <div>
      <button className="btn btn-danger" style={{float: 'right'}} onClick={handleLogout}>Logout</button>
      {/* <h3 color='#'>Class Schedule for a week</h3>
      <img src='https://fitpage.in/wp-content/uploads/2021/10/Article_Banner-1-1.jpg' hegiht="350" width="450" alt="samp"></img>
      <h4>{services} at {location}</h4>
      <h4>{dateFormat(startTime, "dddd, h:MM TT")} to {dateFormat(endTime, "dddd, h:MM TT")}</h4> */}
      <div className="record-container">
      {record.map((record, index) => (
      <div key={index} className="record-details">
      <div className="grid-box">
        <div className="grid-row">
          <div className="grid-column">Email Address: {record.emailAddress}</div>
        </div>
        <div className="grid-row">
          <div className="grid-column">Service: {record.service}</div>
        </div>
        <div className="grid-row">
          <div className="grid-column">Location: {record.location}</div>
        </div>
        <div className="grid-row">
          <div className="grid-column">Your service is valid from {dateFormat(record.startDate, "dd/mm/yyyy, h:MM TT")} to {dateFormat(record.endDate, "dd/mm/yyyy, h:MM TT")}</div>
        </div>
      </div>
    </div>
      ))}
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

<div className="grid-box">
        <div className="grid-row">
      {record.map((record, index) => (
      <div >{record.service.includes('threadmill') && <TreadmillStopwatch services={record.service} location={record.location}/>}
      {record.service.includes('staircase') && <UseStaircase />}
      {record.service.includes('weightlifting') && <Weightlifting />}
      </div>
      ))}
      </div>
      </div>
      
    </div>
  </div>

  );
}


export default Member;
