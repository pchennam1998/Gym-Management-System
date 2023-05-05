import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const HoursChart = () => {
  const [location, setLocation] = useState('San Jose Downtown');
  const [chartData, setChartData] = useState([]);
  const [timeRange, setTimeRange] = useState('1 day');
  const [range, setRange] = useState();
  
  useEffect(() => {
    // const startDate=new Date();
    // let endDate=new Date();
    // endDate.setDate(endDate.getDate() - range);


    // console.log(startDate+"   ---->"+endDate)
    const fetchData = async () => {
      const response = await axios.post('/hourschart', {
        location
      });
      setChartData(response.data);
    };
    fetchData();
  }, []);

   const handleLocationChange = (event) => {
    setLocation(event.target.value);
    const loc=event.target.value;
    const fetchData = async () => {
      const response = await axios.post('/hourschart', {
        loc
      });
      setChartData(response.data);
    };
    fetchData();
  };

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
    let r;
    if (event.target.value=="1 day"){
      setRange(1);
      r=1;
    }
    else if (event.target.value=="1 week"){
      setRange(7)
      r=7;
    }
    else{
      setRange(90)
      r=90;
    }
    const startDate=new Date();
    let endDate=new Date();
    endDate.setDate(endDate.getDate() - r);

    console.log("range"+r)
    console.log(startDate+"   ---->"+endDate)
    const fetchData = async () => {
      const response = await axios.post('/hourschart', {
        location
      });
      setChartData(response.data);
    };
    fetchData();
  };

  

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
          <select value={timeRange} onChange={handleTimeRangeChange}>
            <option value={"1 day"}>1 day</option>
            <option value="1 week">1 week</option>
            <option value="90 days">90 days</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default HoursChart;
