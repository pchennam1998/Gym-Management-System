import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./classes.css";
// import dateFormat from 'dateformat';

function Clsses() {
  const [location, setLocation] = useState('');
  const [exercise, setExercise] = useState(null);

  const data = [
    {
      location: 'San Jose',
      services: 'Treadmill, Weightlifting and Staircase',
      classDay: "Monday, Wednesday and Friday",
      startTime: new Date('T10:00:00'),
      endTime: new Date('T10:00:00'),
      classTime: "6:00 AM to 10:00 PM",
      image: "https://media.istockphoto.com/id/1322158059/photo/dumbbell-water-bottle-towel-on-the-bench-in-the-gym.jpg?s=612x612&w=0&k=20&c=CIdh6LPGwU6U6lbvKCdd7LcppidaYwcDawXJI-b0yGE=",
      text: "The gym in San Jose is a popular destination for fitness enthusiasts in the area. It offers a wide range of equipment and facilities for various types of workouts, including weightlifting, cardio, and group fitness classes. The gym is well-maintained and spacious, allowing visitors to exercise comfortably and safely.Aside from the workout facilities, the gym also has knowledgeable and friendly staff who can help visitors achieve their fitness goals. They offer personalized workout plans, nutritional advice, and support to keep visitors motivated and on track. The gym also hosts various fitness events throughout the year, including fitness challenges, seminars, and social gatherings.Overall, the gym in San Jose is a great place for people looking to improve their fitness, whether they are just starting out or are experienced athletes. With its top-notch equipment, supportive staff, and welcoming atmosphere, it is a great choice for anyone looking to get in shape and lead a healthier lifestyle."
    },
    {
		location: 'Santa Clara',
		services: 'Treadmill, Weightlifting and Staircase',
		classDay: 'Tuesday, Thursday and Saturday',
		startTime: new Date('T10:00:00'),
		endTime: new Date('T10:00:00'),
    classTime: "6:00 AM to 8:00 PM",
    image: "https://www.hussle.com/blog/wp-content/uploads/2020/12/Gym-structure-1080x675.png",
    text: "The gym in Santa Clara is a well-equipped and spacious fitness center that offers a wide range of workout options to its members. With state-of-the-art equipment and facilities, the gym provides an ideal setting for people looking to improve their health and fitness levels. The gym has a dedicated team of professional trainers who are always on hand to help members achieve their fitness goals. From weightlifting and cardio to yoga and group classes, the gym has something for everyone. In addition to its fitness offerings, the gym also provides nutritional advice and meal plans to help members maintain a healthy lifestyle. The gym in Santa Clara has a welcoming and friendly environment that makes it easy for members to feel comfortable and motivated. Whether you're a beginner or an experienced fitness enthusiast, the gym provides a supportive community that will help you achieve your goals. With its convenient location and flexible membership options, the gym in Santa Clara is a great choice for anyone looking to get fit and stay healthy."
    }
    // add more exercise objects as needed
  ];

  const handleSelectChange = e => {
    setLocation(e.target.value);
    setExercise(data.find(item => item.location === e.target.value) || null);
  };

  return (
    <div className="grid-block-container">
      <select value={location} onChange={handleSelectChange}>
        <option value="">Select a Location</option>
        {data.map(item => (
          <option key={item.location} value={item.location}>{item.location}</option>
        ))}
      </select>

      {exercise &&
        <div className="grid-block">
          <h2><b>{exercise.services}</b></h2>
          <p><b>Class Days:</b> Everyday  </p><br></br>
          <p><b>In/Out Time:</b> {exercise.classTime}</p><br></br>
          <p><img src={exercise.image} width="800px" height="400px"/></p>
          {exercise.text}
        </div>
      }
    </div>
  );
}

export default Clsses;
