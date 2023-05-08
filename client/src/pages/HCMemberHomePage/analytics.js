import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function AnalyticsDashboard() {
  const [location, setLocation] = useState('Santa Clara');
  const [chartData, setChartData] = useState(null);
  const [timePeriod, setTimePeriod] = useState('90');
  const COLORS = ["#b2cfb4", "#d9e4c7", "#f7f2e7", "#f5dabd", "#d6b081"];

  Chart.register(CategoryScale);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post('/enrollmentchart', { location, timePeriod });
        setChartData(response.data.data);
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
    <div style={{ position: 'relative', backgroundColor: '#fff', borderRadius: '5px', padding: '0px', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>
      <h4>Classes and Enrollments per Day/Week/Month/90 days</h4>
    <div style={{ position: 'absolute', top: 0, right: 0 }}>
      <select value={location} onChange={handleLocationChange} style={{ fontSize: 16, fontFamily: 'Arial', padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#f2f2f2' }}>
        <option value="San Jose">San Jose</option>
        <option value="Santa Clara">Santa Clara</option>
      </select>
      <select value={timePeriod} onChange={handleTimePeriodChange}>
            <option label="1 day" value="1">1 day</option>
            <option label="1 week" value="7">1 week</option>
            <option label="90 days" value="90">90 days</option>
          </select>
    </div>
    {chartData ? (
      <PieChart width={800} height={400}>
  <Pie
    data={chartData}
    dataKey="value"
    nameKey="label"
    cx="50%"
    cy="50%"
    outerRadius={150}
    fill="#8884d8"
    label
  >
    {chartData.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    ))}
  </Pie>
  <Tooltip />
  <Legend />
</PieChart>
      ) : (
        <p>Loading chart...</p>
      )}
  </div>    
  );
}

export default AnalyticsDashboard;
