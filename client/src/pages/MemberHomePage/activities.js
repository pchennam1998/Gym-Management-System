import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { PieChart } from 'recharts';
import axios from 'axios';

const Activities = (emailAddress) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/activities/', { emailAddress }); // Replace with your API endpoint
        const bookings = res.data;

        const services = {};
        const totalHours = {};

        bookings.forEach(booking => {
          if (services[booking.services]) {
            services[booking.services]++;
          } else {
            services[booking.services] = 1;
          }

          const hours = calculateHours(booking.startTime, booking.endTime);
          if (totalHours[booking.services]) {
            totalHours[booking.services] += hours;
          } else {
            totalHours[booking.services] = hours;
          }
        });

        setChartData({
          labels: Object.keys(services),
          datasets: [
            {
              label: 'No of Hours',
              data: Object.values(totalHours),
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#32CD32',
                '#8B008B',
                '#FF4500',
              ],
            },
          ],
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const calculateHours = (startTime, endTime) => {
    const diff = Math.abs(new Date(endTime) - new Date(startTime));
    return Math.floor(diff / 1000 / 60 / 60);
  };

  return (
    <div>
    <PieChart width={400} height={400}>
      <Pie 
      data={chartData} 
      startAngle={180}
      endAngle={0}
      cx="50%"
      cy="50%"
      outerRadius={80}
      fill="#8884d8"
      label/>
    </PieChart>
    </div>
  );
};

export default Activities;
