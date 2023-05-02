import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import "./hcmember.css";

const EnrollForm = () => {
  const location1 = useLocation();
  const searchParams = new URLSearchParams(location1.search);
  const emailAddress = searchParams.get('email');
  const [service, setService] = useState('threadmill');
  const [location, setLocation] = useState('New York');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [checked, setChecked] = useState(false);
  const [type, setType] = useState('M');
  const [enrollmentExists, setEnrollmentExists] = useState(false);
  const [memType,setMemType]=useState(searchParams.get('type'));

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
            emailAddress: emailAddress,
            service: service,
        }
        console.log(1)
        const response = await axios.post("/enrollments", data); 
        console.log(response)
        setEnrollmentExists(true);
        console.log(enrollmentExists);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [emailAddress, service]);

  useEffect(() => {
    if (startDate) {
     if(checked){
        const sevenLater = new Date(startDate);
        sevenLater.setDate(sevenLater.getDate() + 7);
        setEndDate(sevenLater.toISOString().substring(0, 10));
        
     }
        else{
      const sixMonthsLater = new Date(startDate);
      sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
      setEndDate(sixMonthsLater.toISOString().substring(0, 10));
    }
    }
  }, [startDate]);

  const handleCheck = () => {
    setChecked(!checked);

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const enrollData = {
      emailAddress,
      type: 'M',
      service,
      location,
      startDate,
      endDate,
    };

    console.log(enrollData);

    try {
    if(!checked) {
      await axios.post(`/updatetype/${emailAddress}`, {type}); }
      const response = await axios.post('/all/enroll', enrollData);
      navigate('/hcmember');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="emailAddress">Email Address:</label>
        <input
          type="email"
          id="emailAddress"
          value={emailAddress}
          disabled
        />
      </div>

      <div>
        <label htmlFor="service">Service:</label>
        <select
          id="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value="threadmill">Threadmill</option>
          <option value="weightlifting">Weightlifting</option>
          <option value="staircase">Staircase</option>
        </select>
      </div>

      <div>
        <label htmlFor="location">Location:</label>
        <select
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="San Jose">San Jose</option>
          <option value="Santa Clara">Santa Clara</option>
        </select>
      </div>
{console.log(type)}
      { memType == "NM" &&
      <div>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheck}
        />
        Free Trial
      </label>
      </div>}

      <div>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          disabled 
        />
      </div>

      {!enrollmentExists &&
      <button className="enroll-btn" type="submit">Enroll</button>}

      {enrollmentExists && (
    <p className="enroll-message">
      You are already enrolled in this service
    </p>
  )}
    </form>
  );
};

export default EnrollForm;
