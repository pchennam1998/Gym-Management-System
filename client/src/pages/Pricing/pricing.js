import React from 'react';
import './pricing1.css';

function Pricing() {
  const box1Data = [
    { name: 'Threadmill', hourly: '20$ per hour', monthly: 'Monthly Membership from 360$ for individual and 650$ for couple' },
    { name: 'Stair Case', hourly: '22$ per hour', monthly: 'Monthly Membership from 400$ for individual and 720$ for couple' }
  ];
  const box2Data = [
    { name: 'Threadmill', hourly: '20$ per hour', monthly: 'Monthly Membership from 360$ for individual and 650$ for couple' },
    { name: 'Weight Lifting', hourly: '25$ per hour', monthly: 'Monthly Membership from 450$ for individual and 800$ for couple' }
  ];

  return (
    <>
	<div className="grid-container">
      <div className="grid-box box1">
        <h4>San Jose Downtown</h4><br></br>
        {box1Data.map((pricing, index) => (
          <p key={index} className="pricing-item">
			<b>
            <div className="pricing-name"><b>Exercise: </b>{pricing.name}</div>
            <div className="pricing-email"><b>Hourly Rate(in $): </b>{pricing.hourly}</div>
            <div className="pricing-phone"><b>Monthly Rate(in $): </b> {pricing.monthly}</div>
			</b><br></br>
          </p>
        ))}
      </div>
	  <div className="grid-box box2">
	  <h4>Santa Clara</h4><br></br>
        {box2Data.map((pricing, index) => (
          <p key={index} className="pricing-item">
			<b>
            <div className="pricing-name"><b>Exercise: </b>{pricing.name}</div>
            <div className="pricing-email"><b>Hourly Rate(in $): </b>{pricing.hourly}</div>
            <div className="pricing-phone"><b>Monthly Rate(in $): </b> {pricing.monthly}</div>
			</b><br></br>
          </p>
        ))}
      </div>
    </div>
  </>
  );
}

export default Pricing;
