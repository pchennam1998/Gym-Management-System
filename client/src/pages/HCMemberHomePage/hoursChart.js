import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const HoursChart = () => {
  const [location, setLocation] = useState('San Jose Downtown');
  const [chartData, setChartData] = useState([]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post('/hourschart', {
        location,
      });
      setChartData(response.data);
    };
    fetchData();
  }, [location]);

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <Line
          data={{
            labels: chartData?.map((data) => data.date),
            datasets: [
              {
                label: 'Total Time Spent in Gym',
                data: chartData?.map((data) => data.totalTime),
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
              },
            ],
          }}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            plugins: {
              title: {
                display: true,
                text: `Location: ${location}`,
                position: 'top',
              },
            },
          }}
        />
        <div style={{ position: 'absolute', top: 0, right: 0 }}>
          <select value={location} onChange={handleLocationChange}>
            <option value="San Jose Downtown">San Jose Downtown</option>
            <option value="Santa Clara">Santa Clara</option>
            <option value="New York">New York</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default HoursChart;
