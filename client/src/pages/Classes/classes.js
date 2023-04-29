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
      classDay: ['Monday', 'Wednesday', 'Friday'],
      startTime: new Date('T10:00:00'),
      endTime: new Date('T10:00:00')
    },
    {
		location: 'San Jose Downtown',
		services: 'Threadmill',
		classDay: ['Monday', 'Wednesday', 'Friday'],
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
          <h2>{exercise.services}</h2>
          <p>Class Days: {exercise.classDay}</p><br></br>
          <p>Login Time: {exercise.startTime ? exercise.startTime.toLocaleString() : '-'}</p><br></br>
          <p>Logout Time: {exercise.endTime ? exercise.endTime.toLocaleString() : '-'}</p>
        </div>
      }
    </div>
  );
}

export default Clsses;
