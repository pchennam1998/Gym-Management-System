import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from 'recharts';
// import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function HoursChart() {
  const [chartData, setChartData] = useState(null);
  const [location, setLocation] = useState('San Jose');
  const [timePeriod, setTimePeriod] = useState(7);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post('/visitors', { location, timePeriod });
        setChartData(response.data.data);
      } catch(error) {
        console.error(error);
      }
    }
    fetchData();
  }, [location, timePeriod]);

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  return (
    <div>
      <div>
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
        <Line data={data} />
    //   <AreaChart width={600} height={400} data={chartData}>
    //   <XAxis dataKey="hour" />
    //   <YAxis />
    //   <CartesianGrid strokeDasharray="3 3" />
    //   <Tooltip />
    //   <Area type="monotone" dataKey="visitors" stroke="#8884d8" fill="#8884d8" />
    // </AreaChart>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default HoursChart;
