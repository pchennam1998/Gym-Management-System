import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Label } from 'recharts';
import axios from 'axios';

const AllStats = ({ emailAddress }) => {
  const [location, setLocation] = useState('San Jose Downtown');
  const [totalTime, setTotalTime] = useState([]);
  const [timePeriod, setTimePeriod] = useState('7');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post('/hourlychart', { location, timePeriod });
        setTotalTime([{ label: "Total Time", value: response.data.totalTime }]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [location, timePeriod]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  return (
    <div>
      <h4>Number of Hours spent in total</h4>
      <div>
        <label htmlFor="time-period-select">Select time period:</label>
        <select value={location} onChange={handleLocationChange} style={{ fontSize: 16, fontFamily: 'Arial', padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#f2f2f2' }}>
          <option value="San Jose Downtown">San Jose</option>
          <option value="Santa Clara">Santa Clara</option>
        </select>
        <select id="time-period-select" value={timePeriod} onChange={handleTimePeriodChange}>
          <option label= "1 day" value="1">1 day</option>
          <option label= "1 week" value="7">1 week</option>
          <option label= "1 month" value="30">1 month</option>
          <option label= "90 days" value="90">90 days</option>
        </select>
      </div>
      {totalTime.length > 0 ? (
        <BarChart width={200} height={380} data={totalTime}>
          <XAxis dataKey="label">
            <Label value="Date" position="bottom" />
          </XAxis>
          <YAxis>
            <Label value="Hours" angle={-90} position="insideLeft" />
          </YAxis>
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#b2cfb4" />
        </BarChart>
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default AllStats;
