import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function Weekdays() {
  const [location, setLocation] = useState('San Jose Downtown');
  const [chartData, setChartData] = useState(null);
  const COLORS = ["#660000", "#0c343d", "#783f04", "#073763", "#7f6000", "#20124d", "#274e13"];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post('/getweekday', { location });
        const weekdayCounts = response.data.weekdayCounts;
        const data = Object.entries(weekdayCounts).map(([label, value], index) => ({
          label,
          value
        }));
        setChartData(data);
      } catch(error) {
        console.error(error);
      }
    }
    fetchData();
  }, [location]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <div style={{ position: 'relative', backgroundColor: '#fff', borderRadius: '5px', padding: '0px', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>
      <h4>Number of Visitors during Weekdays and the Weekends</h4>
      <div style={{ position: 'absolute', top: 0, right: 0 }}>
        <select value={location} onChange={handleLocationChange} style={{ fontSize: 16, fontFamily: 'Arial', padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#f2f2f2' }}>
          <option value="San Jose Downtown">San Jose</option>
          <option value="Santa Clara">Santa Clara</option>
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

export default Weekdays;
