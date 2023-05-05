import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

function AnalyticsDashboard() {
  const [location, setLocation] = useState();
  const [chartData, setChartData] = useState(null);

  Chart.register(CategoryScale);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post('/barchart', { location });
        setChartData(response.data.data);
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
    <Bar
      data={{
        labels: chartData?.map((data) => data.label),
        datasets: [{
          label: 'Enrollments',
          data: chartData?.map((data) => data.value),
          backgroundColor: 'rgba(2, 19, 1, 1)',
          borderColor: 'rgba(25, 9, 132, 1)',
          borderWidth: 1,
        }]
      }}
      options={{
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              precision: 0,
              fontColor: '#666',
              fontSize: 14,
              fontFamily: 'Arial',
              padding: 0,
            },
            gridLines: {
              color: '#ddd',
            },
          }],
          xAxes: [{
            ticks: {
              fontColor: '#666',
              fontSize: 14,
              fontFamily: 'Arial',
            },
            gridLines: {
              color: '#ddd',
            },
          }],
        },
        plugins: {
          title: {
            display: true,
            text: `Location: ${location}`,
            position: 'top',
            fontColor: '#333',
            fontSize: 20,
            fontFamily: 'Arial',
            padding: 20,
          },
          legend: {
            display: false,
          },
        },
        onClick: (event, element) => {
          if (element.length) {
            const location = chartData[element[0].index]?.label;
            setLocation(location);
          }
        },
      }}
    />
    <div style={{ position: 'absolute', top: 0, right: 0 }}>
      <select value={location} onChange={handleLocationChange} style={{ fontSize: 16, fontFamily: 'Arial', padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#f2f2f2' }}>
        <option value="San Jose">San Jose</option>
        <option value="Santa Clara">Santa Clara</option>
        <option value="New York">New York</option>
      </select>
    </div>
  </div>    
  );
}

export default AnalyticsDashboard;
