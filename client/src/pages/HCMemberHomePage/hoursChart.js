import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from 'recharts';

function HoursChart() {
  const [chartData, setChartData] = useState(null);
  const [location, setLocation] = useState('San Jose Downtown');
  const [timePeriod, setTimePeriod] = useState(7);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post('/visitors', { location, timePeriod });
        setChartData(response.data);
      } catch(error) {
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
      <div>
        <h4>Number of Visitors in a day per hour</h4>
        <label htmlFor="location-select">Select location:</label>
        <select id="location-select" value={location} onChange={handleLocationChange}>
          <option value="San Jose Downtown">San Jose</option>
          <option value="Santa Clara">Santa Clara</option>
        </select>
        <label htmlFor="time-period-select">Select time period:</label>
        <select id="time-period-select" value={timePeriod} onChange={handleTimePeriodChange}>
          <option value={1}>1 day</option>
          <option value={7}>1 week</option>
          <option value={30}>1 month</option>
          <option value={90}>90 days</option>
        </select>
      </div>
      {chartData ? (
        <BarChart width={600} height={400} data={chartData}>
          <XAxis dataKey="hour" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="visitors" fill="#274e13" />
        </BarChart>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default HoursChart;
