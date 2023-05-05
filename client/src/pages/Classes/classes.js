import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./classes.css";
// import dateFormat from 'dateformat';

function Clsses() {
  const [location, setLocation] = useState('');
  const [exercise, setExercise] = useState(null);

  const data = [
    {
      location: 'Santa Clara',
      services: 'Threadmill',
      classDay: "Monday, Wednesday and Friday",
      startTime: new Date('T10:00:00'),
      endTime: new Date('T10:00:00')
    },
    {
		location: 'Sant Jose',
		services: 'Weight Lifting',
		classDay: 'Tuesday, Thursday and Saturday',
		startTime: new Date('T10:00:00'),
		endTime: new Date('T10:00:00')
    }
    // add more exercise objects as needed
  ];

  const handleSelectChange = e => {
    setLocation(e.target.value);
    setExercise(data.find(item => item.location === e.target.value) || null);
  };

  return (
    <div className="grid-block-container">
      <select value={location} onChange={handleSelectChange}>
        <option value="">Select a Location</option>
        {data.map(item => (
          <option key={item.location} value={item.location}>{item.location}</option>
        ))}
      </select>

      {exercise &&
        <div className="grid-block">
          <h2><b>{exercise.services}</b></h2>
          <p><b>Class Days:</b> Every Weekday </p><br></br>
          <p><b>In/Out Time:</b> 06:00 AM - 10:00 PM</p><br></br>
        </div>
      }
    </div>
  );
}

export default Clsses;
