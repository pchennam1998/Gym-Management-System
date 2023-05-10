import React, { useEffect, useState, PureComponent } from 'react';
import axios from "axios";
import dateFormat from 'dateformat';
import TreadmillStopwatch from './TreadmillStopwatch';
import Activities from './activities';
import { useNavigate, Link } from "react-router-dom";
//mport { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



function Member(props) {

  const [record, setRecord] = useState(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const auth = JSON.parse(localStorage.getItem("auth"));

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
    setEmail(emailAddress);
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
      <h4><b>You're not enrolled into any type of service. Request your <b>Health Club Employee</b> to get registered for any of the plan</b></h4><br></br>
    </div>;
    }
    
  return (
    
    // {<TreadmillStopwatch />}
   
    <div>
     {/* <h2>{emailAddress}</h2> */}
      <div>
      <div>
      <button className="btn btn-danger" style={{float: 'right'}} onClick={handleLogout}>Logout</button>
      <div class="member-card nm-type">
        <div class="nm-member-info">
        <h3><br></br><b>Member Signup for classes</b></h3>
          {auth.employees[0].userRole == 'M' && 
          <div class="nm-member-name">{record.firstName} {record.lastName} <Link to={`/enrollmember?email=${email}`}>
      <button className="btn1">Signup for the classes in advance</button>
    </Link></div>}
          {/* <div class="nm-member-email"><b>{nonmember.emailAddress}</b></div> */}
        </div>
      </div>
      </div>
      <Activities emailAddress={email}/>
      {/* <h3 color='#'>Class Schedule for a week</h3>
      <img src='https://fitpage.in/wp-content/uploads/2021/10/Article_Banner-1-1.jpg' hegiht="350" width="450" alt="samp"></img>
      <h4>{services} at {location}</h4>
      <h4>{dateFormat(startTime, "dddd, h:MM TT")} to {dateFormat(endTime, "dddd, h:MM TT")}</h4> */}
      <h3><br></br><b>Member Class Schedule</b></h3>
      <div className="record-container">
      {record.map((record, index) => (
      <div key={index} className="record-details">
      <div className="grid-box">
        <div className="grid-row">
          <div className="grid-column">Email Address: {record.emailAddress}<br></br></div>
        </div>
        <div className="grid-row">
          <div className="grid-column">Service: {record.service}<br></br></div>
        </div>
        <div className="grid-row">
          <div className="grid-column">Location: {record.location}<br></br></div>
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
      <h4><br></br><b>Log hours for the enrolled classes when you're in GYM</b></h4>
<div className="service-container">
<div className="grid-box">
        <div className="grid-row">
      {record.map((record, index) => (
      <div >{record.service.includes('threadmill') && <TreadmillStopwatch services={record.service} location={record.location} image="https://fitpage.in/wp-content/uploads/2021/10/Article_Banner-1-1.jpg"/>}
      {record.service.includes('staircase') && <TreadmillStopwatch services={record.service} location={record.location} image="https://www.liberty.edu/campusrec/reccenters/wp-content/uploads/sites/13/2020/04/bruno-nascimento-PHIgYUGQPvU-unsplash-1024x683.jpg"/>}
      {record.service.includes('weightlifting') && <TreadmillStopwatch services={record.service} location={record.location} image="https://w7.pngwing.com/pngs/365/988/png-transparent-olympic-weightlifting-computer-icons-weight-training-weightlifting-blue-angle-orange.png"/>}
      </div>
      ))}
      </div>
      </div>
      </div>
    </div>
  </div>
  );
}


export default Member;
