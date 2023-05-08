import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const Activities = ({ emailAddress }) => {
  const [chartData, setChartData] = useState([]);
  const [timePeriod, setTimePeriod] = useState('7');

  useEffect(() => {
    async function fetchData() {
      try {
        const dateRange = getDateRange();
        console.log(dateRange);
        console.log("546547548")
        const response = await axios.post('/detailschart', { emailAddress, timePeriod });
        setChartData(response.data.data);
        console.log(response.length);
        console.log("342412489023");
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [emailAddress, timePeriod]);

  const getDateRange = () => {
    const endDate = new Date();
    let startDate = new Date();

    switch (timePeriod) {
      case '1day':
        startDate.setDate(endDate.getDate() - 1);
        break;
      case '1week':
        startDate.setDate(endDate.getDate() - 7);
        break;
      case '1month':
        startDate.setMonth(endDate.getMonth() - 1);
        break;
      case '90days':
        startDate.setDate(endDate.getDate() - 90);
        break;
      default:
        startDate = null;
    }

    return startDate ? { startDate, endDate } : null;
  };

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  return (
    <div>
      <h2>Number of Hours spent per service</h2>
      <div>
        <label htmlFor="time-period-select">Select time period:</label>
        <select id="time-period-select" value={timePeriod} onChange={handleTimePeriodChange}>
          <option label= "1 day" value="1">1 day</option>
          <option label= "1 week" value="7">1 week</option>
          <option label= "1 month" value="30">1 month</option>
          <option label= "90 days" value="90">90 days</option>
        </select>
      </div>
      {chartData.length ? (
        <BarChart width={800} height={400} data={chartData}>
          <XAxis dataKey="label" />
          <YAxis />
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

export default Activities;
